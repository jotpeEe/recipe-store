import { type NextApiRequest, type NextApiResponse } from 'next';

import { type User } from '../models/user';

export type Context = {
    req: NextApiRequest;
    res: NextApiResponse;
    deserializeUser: (
        req: NextApiRequest,
        res: NextApiResponse
    ) => Promise<User | undefined>;
};
