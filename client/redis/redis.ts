import redis from 'ioredis';

const redisClient = new redis({
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT!),
  username: process.env.REDIS_USERNAME!,
});

export default redisClient;
