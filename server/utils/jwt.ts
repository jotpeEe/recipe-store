import jwt, { type SignOptions } from 'jsonwebtoken';

import {
    accessTokenPrivateKey,
    accessTokenPublicKey,
    refreshTokenPrivateKey,
    refreshTokenPublicKey,
} from '@constants';

const keysToAscii = (key: string) =>
    Buffer.from(key, 'base64').toString('ascii');

export const signJwt = (
    payload: Record<string, unknown>,
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: SignOptions
) => {
    let privateKey = '';

    if (keyName === 'accessTokenPrivateKey') {
        privateKey = keysToAscii(accessTokenPrivateKey);
    } else if (keyName === 'refreshTokenPrivateKey') {
        privateKey = keysToAscii(refreshTokenPrivateKey);
    }

    return jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: 'RS256',
    });
};

export const verifyJwt = <T>(
    token: string,
    keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
    let publicKey = '';

    if (keyName === 'accessTokenPublicKey') {
        publicKey = keysToAscii(accessTokenPublicKey);
    } else if (keyName === 'refreshTokenPublicKey') {
        publicKey = keysToAscii(refreshTokenPublicKey);
    }

    try {
        return jwt.verify(token, publicKey, {
            algorithms: ['RS256'],
        }) as T;
    } catch (error) {
        return null;
    }
};
