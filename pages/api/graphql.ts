import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import deserializeUser from 'server/middleware/deserializeUser';
import resolvers from 'server/resolvers';
import { connectDB } from 'server/utils/connectDB';
import { buildSchema } from 'type-graphql';

const cors = Cors({
    credentials: true,
    origin: ['http://localhost:3000'],
});

// Middleware to run the cors configuration
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
});

const server = new ApolloServer({
    schema,
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
    await connectDB();
    await startServer;
    await server.createHandler({ path: '/api/graphql' })(req, res);
};

export default handler;
