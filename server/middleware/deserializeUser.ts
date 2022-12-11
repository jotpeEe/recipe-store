import { AuthenticationError, ForbiddenError } from 'apollo-server-micro';
import { checkCookies, getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import errorHandler from '../controllers/error.controller';
import UserModel from '../models/user.model';
import { disconnectDB } from '../utils/connectDB';
import redisClient from '../utils/connectRedis';
import { verifyJwt } from '../utils/jwt';

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
        } else if (checkCookies('access_token', { req, res })) {
            accessToken = getCookie('access_token', { req, res });
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

        if (!session) throw new ForbiddenError('Session has expired');

        // Check if user exist
        // eslint-disable-next-line no-underscore-dangle
        const user = await UserModel.findById(JSON.parse(session)._id)
            .select('+verified')
            .lean(true);
        await disconnectDB();

        if (!user || !user.verified) {
            throw new ForbiddenError(
                'The user belonging to this token no logger exist'
            );
        }

        return user;
    } catch (error: any) {
        errorHandler(error);
        return null;
    }
};

export default deserializeUser;
