import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'server/utils/connectDB';
import { buildSchema, Query, Resolver } from 'type-graphql';

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

@Resolver()
class HelloResolver {
    @Query(() => String)
    hello() {
        return 'hello world';
    }
}

const schema = await buildSchema({
    resolvers: [HelloResolver],
});

const server = new ApolloServer({
    schema,
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
