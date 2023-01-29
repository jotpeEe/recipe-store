import { createClient } from 'redis';

import { REDIS_URL } from '@constants';

if (!REDIS_URL) throw new Error('Redis url const not defined');

const redisClient = createClient({
    url: REDIS_URL,
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        setInterval(connectRedis, 5000);
    }
};

connectRedis();

redisClient.on('connect', () =>
    console.log('? Redis client connected succesfully')
);

redisClient.on('error', err => console.error(err));

export default redisClient;
