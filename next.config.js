/* eslint-disable no-param-reassign */
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: config => {
        config.experiments = config.experiments || {};
        config.experiments.topLevelAwait = true;
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/dxkgc7cab/**',
            },
        ],
    },
    output: 'standalone',
};

module.exports = nextConfig;
