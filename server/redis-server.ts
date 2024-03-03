import ioredis from "ioredis";

const redis = new ioredis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  username: process.env.REDIS_USERNAME || "default",
});

export default redis;
