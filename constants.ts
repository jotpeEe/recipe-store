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
