/* eslint-disable no-param-reassign */
// eslint-disable-next-line @typescript-eslint/no-unused-expressions, import/extensions
!process.env.SKIP_ENV_VALIDATION && (await import('./utils/env.mjs'));
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
    eslint: {
        dirs: ['client', 'pages', 'server', 'styles', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    },

    /**
     * If you have the "experimental: { appDir: true }" setting enabled, then you
     * must comment the below `i18n` config out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },
    output: 'standalone',
};

export default nextConfig;
