import cn from 'classnames';

// Host, database, and graphql URLs.
export const HOST_URL =
    process.env.NODE_ENV === 'production'
        ? (process.env.NEXT_PUBLIC_HOST_URL as string)
        : 'http://localhost:3000/';
export const GRAPHQL_ENDPOINT =
    process.env.NODE_ENV === 'production'
        ? cn(HOST_URL, '/api/graphql')
        : 'http://localhost:3000/api/graphql';

export const MONGODB_URI =
    process.env.NODE_ENV === 'production'
        ? (process.env.MONGODB_URL as string)
        : (process.env.MONGODB_URL_DEV as string);

export const REDIS_URL =
    process.env.NODE_ENV === 'production'
        ? (process.env.REDIS_URL as string)
        : 'redis://localhost:6379';

// Getting env variables for tokens used on server side.
export const accessTokenPrivateKey = process.env
    .ACCESS_TOKEN_PRIVATE_KEY as string;

export const refreshTokenPrivateKey = process.env
    .REFRESH_TOKEN_PRIVATE_KEY as string;

export const accessTokenPublicKey = process.env
    .ACCESS_TOKEN_PUBLIC_KEY as string;

export const refreshTokenPublicKey = process.env
    .REFRESH_TOKEN_PUBLIC_KEY as string;

// All types of cookies used on server side.
export const cookies = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    RECIPE_INFO: 'recipe_info',
    LOGGED_IN: 'logged_in',
};

// Recipe list settings.
export const RECIPE_LIMIT = 7;

// Image input settings.
export const CLDN_API_URL =
    'https://api.cloudinary.com/v1_1/dxkgc7cab/image/upload';

export const MAX_IMAGE_SIZE = 500000;
export const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    undefined,
];
