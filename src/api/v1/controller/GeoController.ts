import { log } from "../../../utils/Util";
import { RedisCache } from "../models";
import { GeoLocation } from "../../../interfaces/entity/Interface";
import { ApiService } from "../../../config/apiServer/api";
import { entityErrors } from "../../../utils/EnumEntityError";
import { TreatedAddressObject } from "../../../interfaces/geolocalization/Interfaces";

export class GeoController {
    cache: RedisCache;
    latitude: number;
    longitude: number;
    apiService: ApiService;
    communError: { geo: { notFound: string } };

    constructor(data: GeoLocation = { lat: 0, lng: 0 }) {
        this.latitude = data.lat;
        this.longitude = data.lng;
        this.cache = new RedisCache();
        this.apiService = new ApiService();
        this.communError = entityErrors;
    }

    getAddress = async (): Promise<TreatedAddressObject> => {
        const geoParams = { lat: this.latitude, lng: this.longitude };
        try {
            const cache = await this.verifyAddressInCache(geoParams);

            if (cache) return cache;

            const address = await this.apiService.get(geoParams);
            const adressFound = address.results[0].locations[0];
            if (adressFound) {
                const addressTreated: TreatedAddressObject = {
                    lat: this.latitude,
                    lng: this.longitude,
                    country: adressFound["adminArea1"],
                    state: adressFound["adminArea3"],
                    city: adressFound["adminArea5"],
                    neightborhood: adressFound["adminArea6"],
                    street: adressFound["street"],
                    postal_code: adressFound["postalCode"],
                    json: address
                };

                this.saveAddressInCacheWithThe(`${geoParams.lat},${geoParams.lng}`, addressTreated);

                if (this.isValidAddress(addressTreated)) {
                    return addressTreated;
                } else {
                    throw new Error(this.communError.geo.notFound);
                }
            } else {
                this.saveAddressInCacheWithThe(`${geoParams.lat},${geoParams.lng}`, null);
                throw new Error(this.communError.geo.notFound);
            }
        } catch (error) {
            const { message } = error;
            log("error", message);
            throw new Error(JSON.stringify(message));
        }
    }

    private saveAddressInCacheWithThe(key: string, addressToCached: TreatedAddressObject): void {
        this.cache.saveAddresInCache(key, addressToCached);
    }

    private async verifyAddressInCache(geo: GeoLocation = { lat: 0, lng: 0 }): Promise<TreatedAddressObject> {
        const addressInCache =
            await this.cache
                .getAddress(geo as GeoLocation);

        if (addressInCache) {
            if (this.isValidAddress(addressInCache)) {
                return addressInCache;
            }
            return;
        }
    }

    isValidAddress(address: TreatedAddressObject): boolean {
        const { city, state, country } = address;
        return !!(city && state && country);
    }
}