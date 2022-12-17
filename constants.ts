export const GRAPHQL_ENDPOINT = process.env
    .NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

export const LOCAL_URI = process.env.MONGODB_LOCAL_URI as string;

export const redisURL = 'redis://localhost:6379';

export const accessTokenPrivateKey = process.env
    .ACCESS_TOKEN_PRIVATE_KEY as string;

export const refreshTokenPrivateKey = process.env
    .REFRESH_TOKEN_PRIVATE_KEY as string;

export const accessTokenPublicKey = process.env
    .ACCESS_TOKEN_PUBLIC_KEY as string;

export const refreshTokenPublicKey = process.env
    .REFRESH_TOKEN_PUBLIC_KEY as string;

const CLAUDINARY_ACCOUNT_NAME = process.env
    .NEXT_PUBLIC_CLOUDINARY_ACCOUNT_NAME as string;

export const CLDN_API_URL = `https://api.cloudinary.com/v1_1/${CLAUDINARY_ACCOUNT_NAME}/image/upload`;
