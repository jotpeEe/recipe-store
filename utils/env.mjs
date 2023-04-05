import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({
    MONGODB_URL: z.string().url(),
    MONGODB_URL_DEV: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    REDIS_URL: z.string().url(),
    ACCESS_TOKEN_PRIVATE_KEY: z.string().min(1),
    ACCESS_TOKEN_PUBLIC_KEY: z.string().min(1),
    REFRESH_TOKEN_PUBLIC_KEY: z.string().min(1),
    REFRESH_TOKEN_PRIVATE_KEY: z.string().min(1),
});

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
    NEXT_PUBLIC_HOST_URL: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
    MONGODB_URL: process.env.MONGODB_URL,
    MONGODB_URL_DEV: process.env.MONGODB_URL_DEV,
    REDIS_URL: process.env.REDIS_URL,
    NODE_ENV: process.env.NODE_ENV,
    ACCESS_TOKEN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    ACCESS_TOKEN_PUBLIC_KEY: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY,
    REFRESH_TOKEN_PUBLIC_KEY: process.env.REFRESH_TOKEN_PUBLIC_KEY,
    NEXT_PUBLIC_HOST_URL: process.env.NEXT_PUBLIC_HOST_URL,
};

// Don't touch the part below
// --------------------------

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

// eslint-disable-next-line import/no-mutable-exports, prefer-destructuring
let env = /** @type {MergedOutput} */ (process.env);

if (!!process.env.SKIP_ENV_VALIDATION === false) {
    const isServer = typeof window === 'undefined';

    const parsed = /** @type {MergedSafeParseReturn} */ (
        isServer
            ? merged.safeParse(processEnv) // on server we can validate all env vars
            : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
    );

    if (parsed.success === false) {
        console.error(
            '❌ Invalid environment variables:',
            parsed.error.flatten().fieldErrors
        );
        throw new Error('Invalid environment variables');
    }

    env = new Proxy(parsed.data, {
        get(target, prop) {
            if (typeof prop !== 'string') return undefined;
            // Throw a descriptive error if a server-side env var is accessed on the client
            // Otherwise it would just be returning `undefined` and be annoying to debug
            if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
                throw new Error(
                    process.env.NODE_ENV === 'production'
                        ? '❌ Attempted to access a server-side environment variable on the client'
                        : `❌ Attempted to access server-side environment variable '${prop}' on the client`
                );
            return target[/** @type {keyof typeof target} */ (prop)];
        },
    });
}

export default { env };
