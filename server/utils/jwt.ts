import jwt, { SignOptions } from 'jsonwebtoken';

const keysToAscii = (key: string) =>
    Buffer.from(key, 'base64').toString('ascii');

export const signJwt = (
    payload: Record<string, unknown>,
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: SignOptions
) => {
    const accessTokenPrivateKey = process.env
        .ACCESS_TOKEN_PRIVATE_KEY as string;
    const refreshTokenPrivateKey = process.env
        .REFRESH_TOKEN_PRIVATE_KEY as string;
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
    const accessTokenPublicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY as string;
    const refreshTokenPublicKey = process.env
        .REFRESH_TOKEN_PUBLIC_KEY as string;

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
