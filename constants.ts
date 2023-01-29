export const GRAPHQL_ENDPOINT =
    process.env.NODE_ENV === 'production'
        ? 'https://recipes.mklos.co/api/graphql'
        : 'http://localhost:3000/api/graphql';

export const MONGODB_URI =
    process.env.NODE_ENV === 'production'
        ? (process.env.MONGODB_LOCAL_URI as string)
        : (process.env.MONGODB_LOCAL_URI_DEVELOP as string);

export const REDIS_URL =
    process.env.NODE_ENV === 'production'
        ? (process.env.REDIS_LOCAL_URL as string)
        : 'redis://localhost:6379';

export const accessTokenPrivateKey = process.env
    .ACCESS_TOKEN_PRIVATE_KEY as string;

export const refreshTokenPrivateKey = process.env
    .REFRESH_TOKEN_PRIVATE_KEY as string;

export const accessTokenPublicKey = process.env
    .ACCESS_TOKEN_PUBLIC_KEY as string;

export const refreshTokenPublicKey = process.env
    .REFRESH_TOKEN_PUBLIC_KEY as string;

export const RECIPE_LIMIT = 7;

export const cookies = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    RECIPE_INFO: 'recipe_info',
    LOGGED_IN: 'logged_in',
};

export const CLDN_API_URL =
    'https://api.cloudinary.com/v1_1/dxkgc7cab/image/upload';
