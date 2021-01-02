import { address } from "../../../entity/Interface";
import redisClient = require('../../../config/Redis.client');

export class RedisCache {
    getAddress({ lat, lng }): Promise<address> {
        return new Promise(async (resolve, reject) => {
            const rawData = await redisClient.getAsync(`${lat},${lng}`);
            rawData ? resolve(JSON.parse(rawData)) : reject(false);
        })
    }
    saveAddresInCache({ lat, lng }, newAddress: address | object): Promise<address | object> {
        return new Promise(async (resolve, reject) => {
            await redisClient.setAsync(`${lat},${lng}`, JSON.stringify(newAddress), 'EX', 60 * 60 * 24);
            redisClient ? resolve(newAddress) : reject({})
        })
    }
}