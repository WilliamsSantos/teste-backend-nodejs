import * as redis from "redis";
import { promisify } from "util";

let connect =  {
  host: process.env.REDIS_HOST_TEST,
  port: parseInt(process.env.REDIS_PORT_TEST)
}

if (process.env.NODE_ENV === 'test') {
  connect = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT)
  }
}

const client: redis.RedisClient = redis.createClient({
  ...connect
});

export = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client)
};