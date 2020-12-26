import { Request, Response, Router } from "express";
import { getConnection } from "typeorm";
import { log, errorResponse, errorTratment } from "../../../utils/util";
import { 
    DenounceController, 
    AddressController, 
    GeoController, 
    DenounciatorController 
} from "../controller";

import { address, denounce, denounciator, geoLocation } from "../../../entity/interface";
import { requestDenounce, responseDenounce } from "./interfaces";

const routerDenounces = Router();
// Criar midleware
routerDenounces.post('/', async (req: Request, res: Response): Promise<void> => {
    const {  denounces, denunciator, longitude, latitude } :requestDenounce = req.body;
    let denouncesSave: denounce, denunciatorSave: denounciator, addressSave: address;

    console.log(45345, req.body)
    try {
        await getConnection().transaction(async transactionalEntityManager => { 
            denunciatorSave = await new DenounciatorController(denunciator).save();

            console.log('========= save denunciator =========');
            let addressFinded = await new GeoController({ lng: longitude, lat: latitude } as geoLocation).getAddress();

            addressSave = await new AddressController(addressFinded).save();

            console.log('========= save address =========');

            denouncesSave = await new DenounceController(denounces).save();

            console.log('========= save denunces =========');
        });

        const responseJson: responseDenounce = {
            id: denouncesSave['id'], // denouncesSave['id'],
            latitude: latitude, // latitude,
            longitude: longitude, // longitude,
            denunciator: denunciatorSave, // denunciatorSave,
            denounces: denouncesSave,
            address: addressSave, //addressSave
        };

        res.status(200).json(responseJson);
    } catch (error) {
        const errors = errorResponse([{message: error.message, code: error.code}]);

        log('error', `Erro message on denounces router catch: ${errors}`);        
        res.status(500).json(errors);
    }
});

export = routerDenounces;