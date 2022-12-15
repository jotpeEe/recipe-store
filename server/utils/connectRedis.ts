import { createClient } from 'redis';

import { redisURL } from '@constants';

const redisClient = createClient({
    url: redisURL,
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
