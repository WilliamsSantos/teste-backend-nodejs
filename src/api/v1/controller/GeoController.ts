import * as http from "http";
import { getManager } from "typeorm"; 
import { 
    RedisCache
} from "../models";
import { address, geoLocation } from "../../../entity/interface";
import { errorResponse, errorTratment, log } from "../../../utils/util";

export class GeoController {
    protected KEY_APP = process.env.COSTUMER_KEY;
    protected URL: string = process.env.GEO_URL_API
    lat:number;
    lng:number;

    constructor(data: geoLocation){
        this.lng = data.lng;
        this.lat = data.lat;
    }

    getAddress = async (): Promise<address> => {

        let params: string = `?key=${this.KEY_APP}`;
        params += `&location=${this.lat},${this.lng}`;
        params += `&includeRoadMetadata=true&includeNearestIntersection=true`;
    
        const address: address = await new RedisCache().getAddress({ lat: this.lat, lng: this.lng } as geoLocation)
        .then(res => res)
        .catch(err => err);

        if (address) {
            return address;
        } else {
            http.get(`${this.URL}${params}`, (response) => {
                let data:string = '';
                // called when a data chunk is received.
                response.on('data', (chunk) => {
                    data += chunk;
                    if (response.statusCode != 200) {
                        const errors:Array<object> = errorTratment(response);
                        return errorResponse(errors);
                    }
                });
                // called when the complete responseponse is received.
                response.on('end', async () => {
                    data = JSON.parse(data);
    
                    const adressFound = data['results'][0]['locations'][0];
                    console.log('323432342422344234234', adressFound)
                    const address:address = {
                        lat: this.lat, 
                        lng: this.lng,
                        country: adressFound['adminArea1'],
                        state: adressFound['adminArea3'],
                        city : adressFound['adminArea5'],
                        neightborhood : adressFound['adminArea6'],
                        street : adressFound['street'],
                        postal_code: adressFound['postalCode'],
                    }
    
                    await new RedisCache().saveAddresInCache({ lat: this.lat, lng: this.lng }, address);
    
                    return address;
                });
            }).on("error", (err) => {
                console.log("Error: ", err.message);

                log('error', `Error in GeoController catch: ${err.message}`);
                
                const errors:Array<object> = errorTratment(err.message);
                return errorResponse(errors);
            });
        }
    }
}