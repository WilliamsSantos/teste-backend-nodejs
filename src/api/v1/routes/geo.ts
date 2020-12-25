import { Request, Response, Router } from "express";
import * as http from "http";
import { address } from "../entity/interface";
import { RedisCache } from "../models/Redis";

const routerDenounces = Router();

routerDenounces.get('/', async (req: Request, res: Response) => {    
    const url:string = process.env.GEO_URL_API,
    keyAPI:string = process.env.COSTUMER_KEY,

    lat: number = +req.query.lat,//30.333472,
    lng: number = +req.query.lng//-81.470448;

    let params: string = `?key=${keyAPI}`;
    params += `&location=${lat},${lng}`;
    params += `&includeRoadMetadata=true&includeNearestIntersection=true`;

    const address:address = await new RedisCache().getAddress({lat, lng})
    .then(res => res)
    .catch(err => err);

    if (address) {
        res.status(200).json(address);
    } else {
        http.get(`${url}${params}`, (response) => {
            let data = '';
            // called when a data chunk is received.
            response.on('data', (chunk) => {
                data += chunk;
                if (response.statusCode != 200) {
                    res.json(data)
                }
            });
            // called when the complete responseponse is received.
            response.on('end', async () => {
                data = JSON.parse(data);

                const adressFound = data['results'][0]['locations'][0];
                const address:address = {
                    city : adressFound['adminArea5'],
                    street : adressFound['street'],
                    neightborhood : adressFound['adminArea6'],
                    state: adressFound['adminArea3'],
                    country: adressFound['adminArea1'],
                    postal_code: adressFound['postalCode'],
                }

                await new RedisCache().saveAddresInCache({lat, lng}, address);

                res.status(200).json(address);
            });
        }).on("error", (err) => {
            console.log("Error: ", err.message);
            res.status(200).json(err.message);
        });
    }
});

export = routerDenounces;