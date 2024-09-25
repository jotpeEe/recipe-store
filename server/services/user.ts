import {
    AuthenticationError,
    ForbiddenError,
    ValidationError,
} from 'apollo-server-micro';
import { setCookie } from 'cookies-next';
import { type OptionsType } from 'cookies-next/lib/types';

import { cookies } from '@constants';
import errorHandler from '@controllers';
import { RecipeModel, type User, UserModel } from '@models';
import { type LoginInput } from '@schemas/user';
import { redisClient, signJwt, verifyJwt } from '@utils';
import { type Context } from 'server/types/context';

const accessTokenExpiresIn = 15;
const refreshTokenExpiresIn = 60;

const { ACCESS_TOKEN, REFRESH_TOKEN, LOGGED_IN } = cookies;

const cookieOptions: OptionsType = {
    httpOnly: true,
    sameSite: 'lax',
};

if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

const accessTokenCookieOptions = {
    ...cookieOptions,
    maxAge: accessTokenExpiresIn * 60,
    expires: new Date(Date.now() + accessTokenExpiresIn * 60 * 1000),
};

const refreshTokenCookieOptions = {
    ...cookieOptions,
    maxAge: refreshTokenExpiresIn * 60,
    expires: new Date(Date.now() + refreshTokenExpiresIn * 60 * 1000),
};

const signTokens = (user: User) => {
    const userId: string = user._id.toString();
    const accessToken = signJwt({ userId }, 'accessTokenPrivateKey', {
        expiresIn: `${accessTokenExpiresIn}m`,
    });

    const refreshToken = signJwt({ userId }, 'refreshTokenPrivateKey', {
        expiresIn: `${refreshTokenExpiresIn}m`,
    });

    redisClient.set(userId, JSON.stringify(user), {
        EX: refreshTokenExpiresIn * 60,
    });

    return { accessToken, refreshToken };
};

const findByEmail = async (email: string): Promise<User | null> =>
    UserModel.findOne({ email }).select('+password');

export default class UserService {
    signUpUser = async (input: Partial<User>, { req, res }: Context) => {
        try {
            const user = await UserModel.create(input);

            // Sign JWT Tokens
            const { accessToken, refreshToken } = signTokens(user);

            // Add Tokens to Context
            setCookie(ACCESS_TOKEN, accessToken, {
                req,
                res,
                ...accessTokenCookieOptions,
            });
            setCookie(REFRESH_TOKEN, refreshToken, {
                req,
                res,
                ...refreshTokenCookieOptions,
            });
            setCookie(LOGGED_IN, 'true', {
                req,
                res,
                ...refreshTokenCookieOptions,
                httpOnly: false,
            });

            return {
                status: 'success',
                user: user.toJSON(),
            };
        } catch (error: any) {
            if (error.code === 11000) {
                return new ForbiddenError('Email already exists');
            }
            errorHandler(error);
            return { status: 'error' };
        }
    };

    loginUser = async (input: LoginInput, { req, res }: Context) => {
        try {
            // Find user by email
            const user = await findByEmail(input.email);

            if (!user) {
                return new AuthenticationError(
                    'There is no user with that email'
                );
            }

            // Compare passwords
            if (
                !(await UserModel.comparePasswords(
                    user.password,
                    input.password
                ))
            ) {
                return new AuthenticationError('Invalid password');
            }

            // Sign JWT Tokens
            const { accessToken, refreshToken } = signTokens(user);

            // Add Tokens to Context
            setCookie(ACCESS_TOKEN, accessToken, {
                req,
                res,
                ...accessTokenCookieOptions,
            });
            setCookie(REFRESH_TOKEN, refreshToken, {
                req,
                res,
                ...refreshTokenCookieOptions,
            });
            setCookie(LOGGED_IN, 'true', {
                req,
                res,
                ...refreshTokenCookieOptions,
                httpOnly: false,
            });

            return {
                status: 'success',
                access_token: accessToken,
            };
        } catch (error: any) {
            return { status: 'error' };
        }
    };

    // Get Authenticated User
    getMe = async ({ req, res, deserializeUser }: Context) => {
        try {
            const user = await deserializeUser(req, res);
            return {
                status: 'success',
                user: {
                    ...user,
                    id: user?._id,
                },
            };
        } catch (error: any) {
            errorHandler(error);
            return { status: 'error' };
        }
    };

    refreshAccessToken = async ({ req, res }: Context) => {
        try {
            // Get the refresh token
            const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) {
                throw new ForbiddenError('Could not refresh access token');
            }

            // Validate the RefreshToken
            const decoded = verifyJwt<{ userId: string }>(
                refreshToken as string,
                'refreshTokenPublicKey'
            );

            if (!decoded) {
                throw new ForbiddenError('Could not refresh access token');
            }

            // Check if user's session is valid
            const session = await redisClient.get(decoded.userId);

            if (!session) {
                setCookie(ACCESS_TOKEN, '', { req, res, maxAge: -1 });
                setCookie(REFRESH_TOKEN, '', { req, res, maxAge: -1 });
                setCookie(LOGGED_IN, '', { req, res, maxAge: -1 });

                throw new ForbiddenError('User session has expired');
            }

            // Check if user exist and is verified
            const user = await UserModel.findById(
                JSON.parse(session)._id
            ).select('+verified');

            if (!user || !user.verified) {
                throw new ForbiddenError('Could not refresh access token');
            }

            // Sign new access token
            const accessToken = signJwt(
                {
                    userId: user._id,
                },
                'accessTokenPrivateKey',
                {
                    expiresIn: `${accessTokenExpiresIn}m`,
                }
            );

            // Send access token cookie
            setCookie(ACCESS_TOKEN, accessToken, {
                req,
                res,
                ...accessTokenCookieOptions,
            });

            return {
                status: 'success',
                access_token: accessToken,
            };
        } catch (error) {
            errorHandler(error);
            return { status: 'error' };
        }
    };

    logoutUser = async ({ req, res, deserializeUser }: Context) => {
        try {
            const user = await deserializeUser(req, res);

            // Delete the user's session
            await redisClient.del(String(user?._id));

            // Logout user
            setCookie(ACCESS_TOKEN, '', { req, res, maxAge: -1 });
            setCookie(REFRESH_TOKEN, '', { req, res, maxAge: -1 });
            setCookie(LOGGED_IN, '', { req, res, maxAge: -1 });

            return true;
        } catch (error) {
            errorHandler(error);
            return false;
        }
    };

    deleteUser = async (id: string, { req, res, deserializeUser }: Context) => {
        try {
            await deserializeUser(req, res);
            const user = await UserModel.findByIdAndDelete(id);

            // Delete the user's session
            await redisClient.del(String(user?._id));

            if (!user)
                return new ValidationError('No user with that id exists');

            return true;
        } catch (error: any) {
            errorHandler(error);
            return false;
        }
    };

    addBookmark = async (
        id: string,
        { req, res, deserializeUser }: Context
    ) => {
        try {
            const user = await deserializeUser(req, res);

            const recipe = await RecipeModel.findById(id);

            const updatedUser = await UserModel.findByIdAndUpdate(
                user?._id,
                {
                    $addToSet: { bookmarks: recipe?._id },
                },
                {
                    new: true,
                    runValidators: true,
                    lean: true,
                }
            );

            return { status: 'success', user: updatedUser };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                user: {},
            };
        }
    };

    getAllBookmarkedRecipes = async ({
        req,
        res,
        deserializeUser,
    }: Context) => {
        try {
            const checkedUser = await deserializeUser(req, res);
            const user = await UserModel.findById(checkedUser?._id).populate([
                {
                    path: 'bookmarks',
                    model: 'Recipe',
                    populate: [
                        {
                            path: 'user',
                            model: 'User',
                        },
                        {
                            path: 'ratings',
                            model: 'Rating',
                        },
                        {
                            path: 'reviews',
                            model: 'Review',
                            populate: [
                                {
                                    path: 'user',
                                    model: 'User',
                                },
                            ],
                        },
                    ],
                },
            ]);

            return {
                status: 'success',
                results: user?.bookmarks.length,
                recipes: user?.bookmarks,
            };
        } catch (error: any) {
            errorHandler(error);
            return {
                status: 'error',
                results: 0,
                recipes: {},
            };
        }
    };
}
