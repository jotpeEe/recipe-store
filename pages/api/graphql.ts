import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { buildSchema } from 'type-graphql';

import deserializeUser from '@middleware/deserializeUser';
import resolvers from '@resolvers';
import { connectDB } from '@utils';

const cors = Cors({
    origin: ['http://localhost:3000', 'https://recipes.mklos.dev'],
    credentials: true,
});

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) =>
    new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });

const schema = await buildSchema({
    resolvers,
    dateScalarMode: 'isoDate',
});

const server = new ApolloServer({
    schema,
    cache: 'bounded',
    csrfPrevention: true,
    context: ({ req, res }: { req: NextApiRequest; res: NextApiResponse }) => ({
        req,
        res,
        deserializeUser,
    }),
});

export const config = {
    api: {
        bodyParser: false,
    },
};

const startServer = server.start();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, cors);
    await startServer;
    await connectDB();
    await server.createHandler({
        path: '/api/graphql',
    })(req, res);
};

export default handler;
