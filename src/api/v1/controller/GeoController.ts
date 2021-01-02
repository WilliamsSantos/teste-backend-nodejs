import * as http from "http";
import { RedisCache } from "../models";
import { TreatedAddressObject } from "../../../interfaces/geolocalization/Interfaces";
import { errorResponse, log } from "../../../utils/Util";
import { URL } from "url";
import { GeoLocation } from "../../../interfaces/entity/Interface";
import { entityErrors } from "../../../utils/EnumEntityError";

export class GeoController {
    protected KEY: string = process.env.COSTUMER_KEY;
    protected URL: string = process.env.GEO_URL_API;
    latitude: number;
    longitude: number;
    identifierRqt: any;
    constructor(data: GeoLocation) {
        if (!data) {
            data = { lat: 0, lng: 0 };
        }
        this.latitude = data.lat;
        this.longitude = data.lng;
    }

    getAddress = async (): Promise<TreatedAddressObject> => {
        return new Promise(async (resolve, reject) => {

            const addressInCache = await new RedisCache()
                .getAddress({ lat: this.latitude, lng: this.longitude } as GeoLocation);

            if (addressInCache) {
                if (this.isValidAddress(addressInCache)) {
                    resolve(addressInCache);
                } else {
                    reject(entityErrors.geo.notFound)
                }
            }

            let params = `?key=${this.KEY}`;
            params += `&location=${this.latitude},${this.longitude}`;
            params += `&includeRoadMetadata=true&includeNearestIntersection=true`;

            const options = new URL(`${this.URL}${params}`);
            const req = http.request(options, (response) => {

                let data: string = '', error: Error;

                if (response.statusCode !== 200) {
                    error = new Error('Request Failed.\n' +
                        `Status Code: ${response.statusCode}`);
                }

                if (error) {
                    log('error', `Error in GeoController: ${error.message}`);
                    response.resume();
                    reject(error.message);
                }

                // called when a data chunk is received.
                response.on('data', async (chunk) => data += chunk);
                response.on('end', async () => {
                    try {
                        const dataParse = JSON.parse(data);

                        const adressFound = dataParse['results'][0]['locations'][0];
                        if (adressFound) {
                            const addressTreated: TreatedAddressObject = {
                                lat: this.latitude,
                                lng: this.longitude,
                                country: adressFound['adminArea1'],
                                state: adressFound['adminArea3'],
                                city: adressFound['adminArea5'],
                                neightborhood: adressFound['adminArea6'],
                                street: adressFound['street'],
                                postal_code: adressFound['postalCode'],
                                json: dataParse
                            };

                            await new RedisCache().saveAddresInCache({
                                lat: this.latitude,
                                lng: this.longitude
                            }, addressTreated);

                            if (this.isValidAddress(addressTreated)) {
                                resolve(addressTreated);
                            } else {
                                log('error', entityErrors.geo.notFound);
                                reject(entityErrors.geo.notFound);
                            }
                        } else {
                            await new RedisCache().saveAddresInCache({
                                lat: this.latitude,
                                lng: this.longitude
                            }, null);
                            reject(entityErrors.geo.notFound)
                        }
                    } catch (e) {
                        reject(e.message);
                    }
                });
            }).on("error", async (err) => {
                log('error', `Error in GeoController catch: ${err.message}`);
                reject(errorResponse(err.message));
            });
            req.end();
        })
    }

    isValidAddress(address: TreatedAddressObject): boolean {
        if (address.city && address.city.length
            && address.state && address.state.length
            && address.country && address.country.length) {
            return true;
        }
        return false
    }
}