import * as redis from "redis";
import { promisify } from "util";
import { redisConfig } from "../config/Configurations";

const connect = {
  "host": redisConfig.host,
  "port": parseInt(redisConfig.port)
}

const client: redis.RedisClient = redis.createClient({
  ...connect
});

export const redisClient = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client)
};