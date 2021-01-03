import { redisClient } from '../../../config/Redis.client';
import { GeoLocation } from '../../../interfaces/entity/Interface';
import { TreatedAddressObject } from "../../../interfaces/geolocalization/Interfaces";

export class RedisCache {
    emptyAddress: TreatedAddressObject = {
        lat: 0,
        lng: 0,
        country: '',
        state: '',
        city: '',
        neightborhood: '',
        street: '',
        postal_code: '',
        json:{}
    }

    async getAddress({ lat, lng }:GeoLocation): Promise<TreatedAddressObject> {
        const rawData = await redisClient.getAsync(`${lat},${lng}`);
        return rawData
            ? this.parseStringAddressToObject(rawData)
            : null;
    }
    async saveAddresInCache(key:string, newAddress: TreatedAddressObject): Promise<TreatedAddressObject> {
        await redisClient.setAsync(key, this.convertAddressObjectToString(newAddress), 'EX', 60 * 60 * 24);
        return redisClient
            ? newAddress
            : null;
    }
    private convertAddressObjectToString(object: TreatedAddressObject): string {
        return JSON.stringify(object);
    }
    private parseStringAddressToObject(stringAddress: string): TreatedAddressObject {
        return JSON.parse(stringAddress);
    }
}