import { AuthenticationError, ForbiddenError } from 'apollo-server-micro';
import { setCookies } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import errorHandler from 'server/controllers/error.controller';
import UserModel, { User } from 'server/models/user';
import { LoginInput } from 'server/schemas/user';
import { Context } from 'server/types/context';
import { disconnectDB } from 'server/utils/connectDB';
import redisClient from 'server/utils/connectRedis';
import { signJwt, verifyJwt } from 'server/utils/jwt';

const accessTokenExpiresIn = 15;
const refreshTokenExpiresIn = 60;

const cookieOptions: OptionsType = {
    httpOnly: true,
    // domain: '/',
    sameSite: 'lax',
    // secure: true,
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
    signUpUser = async (input: Partial<User>) => {
        try {
            const user = await UserModel.create(input);
            await disconnectDB();
            return {
                status: 'success',
                user: user.toJSON(),
            };
        } catch (error: any) {
            if (error.code === 11000) {
                return new ForbiddenError('Email already exists');
            }
            errorHandler(error);
            return null;
        }
    };

    loginUser = async (input: LoginInput, { req, res }: Context) => {
        try {
            const message = 'Invalid email or password';
            // Find user by email
            const user = await findByEmail(input.email);
            await disconnectDB();

            if (!user) {
                return new AuthenticationError(message);
            }

            // Compare passwords
            if (
                !(await UserModel.comparePasswords(
                    user.password,
                    input.password
                ))
            ) {
                return new AuthenticationError(message);
            }

            // Sign JWT Tokens
            const { accessToken, refreshToken } = signTokens(user);

            // Add Tokens to Context
            setCookies('access_token', accessToken, {
                req,
                res,
                ...accessTokenCookieOptions,
            });
            setCookies('refresh_token', refreshToken, {
                req,
                res,
                ...refreshTokenCookieOptions,
            });
            setCookies('logged_in', 'true', {
                req,
                res,
                ...accessTokenCookieOptions,
                httpOnly: false,
            });
            return {
                status: 'success',
                accessToken,
            };
        } catch (error: any) {
            errorHandler(error);
            return null;
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
            return null;
        }
    };

    refreshAccessToken = async ({ req, res }: Context) => {
        try {
            // Get the refresh token
            const { refreshToken } = req.cookies;

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
                throw new ForbiddenError('User session has expired');
            }

            // Check if user exist and is verified
            const user = await UserModel.findById(
                JSON.parse(session)._id
            ).select('+verified');
            await disconnectDB();

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
            setCookies('access_token', accessToken, {
                req,
                res,
                ...accessTokenCookieOptions,
            });
            setCookies('logged_in', 'true', {
                req,
                res,
                ...accessTokenCookieOptions,
                httpOnly: false,
            });

            return {
                status: 'success',
                accessToken,
            };
        } catch (error) {
            errorHandler(error);
            return null;
        }
    };

    logoutUser = async ({ req, res, deserializeUser }: Context) => {
        try {
            const user = await deserializeUser(req, res);

            // Delete the user's session
            await redisClient.del(String(user?._id));

            // Logout user
            setCookies('access_token', '', { req, res, maxAge: -1 });
            setCookies('refresh_token', '', { req, res, maxAge: -1 });
            setCookies('logged_in', '', { req, res, maxAge: -1 });

            return true;
        } catch (error) {
            errorHandler(error);
            return null;
        }
    };
}
