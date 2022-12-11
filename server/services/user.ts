import { OptionsType } from 'cookies-next/lib/types';
import { User } from 'server/models/user';
import redisClient from 'server/utils/connectRedis';
import { signJwt } from 'server/utils/jwt';

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
