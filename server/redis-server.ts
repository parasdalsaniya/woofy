import ioredis from "ioredis";

const redis = new ioredis({
  host: "localhost",
  port: 6379,
  password: "password",
});

export default redis;
