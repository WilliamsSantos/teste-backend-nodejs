import { address } from "../../../entity/interface";
import redisClient = require('../../../config/redis.client');

export class RedisCache {
    getAddress({lat, lng}): Promise<address> {
        return new Promise(async (resolve, reject) => {
            const rawData = await redisClient.getAsync(`${lat},${lng}`);
            rawData ? resolve(rawData) : reject();
        })
    }
    saveAddresInCache({lat, lng}, newAddress:address): Promise<address> {
        return new Promise(async (resolve, reject) => {
            await redisClient.setAsync(`${lat},${lng}`, JSON.stringify(newAddress));
            redisClient ? resolve(newAddress) : reject({})
        })
    }
}