import * as http from "http";
import { RedisCache } from "../models";
import { address, geoLocation } from "../../../entity/interface";
import { errorResponse, log } from "../../../utils/util";
import { URL } from "url";

export class GeoController {
    protected KEY: string = process.env.COSTUMER_KEY;
    protected URL: string = process.env.GEO_URL_API;

    latitude: number;
    longitude: number;

    constructor(data?: geoLocation) {
        if (!data) {
            data = {lat:0, lng:0};
        }
        this.latitude = data.lat;
        this.longitude = data.lng;
    }

    getAddress = async (): Promise<address> => {
        return new Promise(async (resolve, reject) => {

            const addressInCache = await new RedisCache()
                .getAddress({ lat: this.latitude, lng: this.longitude } as geoLocation)
                .then(res => res)
                .catch(err => err);

            if (addressInCache) {
                if (this.isValidAddress(addressInCache)) {
                    resolve(addressInCache);
                } else {
                    reject('Endereço não encontrado para essa localidade.')
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
                        data = JSON.parse(data);

                        const adressFound = data['results'][0]['locations'][0];
                        if (adressFound) {                            
                            const address: address = {
                                lat: this.latitude,
                                lng: this.longitude,
                                country: adressFound['adminArea1'],
                                state: adressFound['adminArea3'],
                                city: adressFound['adminArea5'],
                                neightborhood: adressFound['adminArea6'],
                                street: adressFound['street'],
                                postal_code: adressFound['postalCode'],
                            };

                            await new RedisCache().saveAddresInCache({
                                lat: this.latitude,
                                lng: this.longitude
                            }, address);

                            if (this.isValidAddress(address)) {
                                resolve(address);
                            } else {
                                log('error', 'Endereço não encontrado para essa localidade.');
                                reject('Endereço não encontrado para essa localidade.');
                            }
                        } else {
                            await new RedisCache().saveAddresInCache({
                                lat: this.latitude,
                                lng: this.longitude
                            }, {});
                            reject('Endereço não encontrado para essa localidade.')
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

    isValidAddress(address: address): boolean {
        if (address.city && address.city.length
            && address.state && address.state.length
            && address.country && address.country.length) {
            return true;
        }
        return false
    }
}