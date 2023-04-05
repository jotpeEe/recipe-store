import { AuthenticationError, ForbiddenError } from 'apollo-server-micro';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

import { cookies } from '@constants';
import errorHandler from '@controllers';
import { UserModel } from '@models';
import { redisClient, verifyJwt } from '@utils';

const { ACCESS_TOKEN, REFRESH_TOKEN, LOGGED_IN } = cookies;

const deserializeUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Get the access token
        let accessToken;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            const { 1: token } = req.headers.authorization.split(' ');
            accessToken = token;
        } else if (hasCookie(ACCESS_TOKEN, { req, res })) {
            accessToken = getCookie(ACCESS_TOKEN, { req, res });
        }

        if (!accessToken)
            throw new AuthenticationError('No access token found');

        // Validate the Access token
        const decoded = verifyJwt<{ userId: string }>(
            String(accessToken),
            'accessTokenPublicKey'
        );

        if (!decoded) throw new AuthenticationError('Invalid access token');

        // Check if the session is valid
        const session = await redisClient.get(decoded.userId);

        if (!session) {
            setCookie(ACCESS_TOKEN, '', { req, res, maxAge: -1 });
            setCookie(REFRESH_TOKEN, '', { req, res, maxAge: -1 });
            setCookie(LOGGED_IN, '', { req, res, maxAge: -1 });
            throw new ForbiddenError('Session has expired');
        }

        // Check if user exist
        const user = await UserModel.findById(JSON.parse(session)._id)
            .select('+verified')
            .lean(true);

        if (!user || !user.verified) {
            throw new ForbiddenError(
                'The user belonging to this token no logger exist'
            );
        }

        return user;
    } catch (error: any) {
        errorHandler(error);
        return undefined;
    }
};

export default deserializeUser;
