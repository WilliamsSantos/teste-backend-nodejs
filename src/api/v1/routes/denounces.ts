import { Request, Response, Router } from "express";
import { getConnection } from "typeorm";
import { log, errorResponse } from "../../../utils/util";
import {
    DenounceController,
    AddressController,
    GeoController,
    DenounciatorController
} from "../controller";

import { address, denounce, denounciator, geoLocation } from "../../../entity/interface";
import { requestDenounce, responseDenounce } from "./interfaces";

const routerDenounces = Router();

routerDenounces.post('/', async (req: Request, res: Response): Promise<void> => {
    const { denounces, denunciator, longitude, latitude }: requestDenounce = req.body;

    let denouncesSave: denounce, denunciatorSave: denounciator, addressSave: address;

    try {
        await getConnection().transaction(async transactionalEntityManager => {
            denunciatorSave =
                await new DenounciatorController(denunciator)
                    .save(transactionalEntityManager);

            let addressFinded =
                await new GeoController({ lng: longitude, lat: latitude } as geoLocation)
                    .getAddress();

            addressSave =
                await new AddressController(addressFinded)
                    .save(transactionalEntityManager);

            denounces.address_id = addressSave.id;
            denounces.denunciator_id = denunciatorSave.id;
            denouncesSave =
                await new DenounceController(denounces)
                    .save(transactionalEntityManager);
        });

        const fieldsToRemove: Array<string> = [
            'id', 'created_at', 'updated_at', 'address_id', 'denunciator_id', 'tableName'
        ];
        removeUnnecessaryFields(denunciatorSave, fieldsToRemove);
        removeUnnecessaryFields(denouncesSave, fieldsToRemove, 'id');
        removeUnnecessaryFields(addressSave, fieldsToRemove);

        const responseJson: responseDenounce = {
            id: denouncesSave['id'],
            latitude: latitude,
            longitude: longitude,
            denunciator: denunciatorSave,
            denounces: denouncesSave,
            address: addressSave
        };

        removeUnnecessaryFields(responseJson.denounces, 'id');

        res.status(201).json(responseJson);
    } catch (error) {
        const errors = errorResponse(error);

        log('error', `Erro message on denounces router catch: ${errors}`);
        res.status(500).json(errors);
    }
});

function removeUnnecessaryFields(object: any, fields: Array<string> | string, ignore?: string) {
    if (!Array.isArray(fields)) {
        delete object[fields]
    }
    for (const field of fields) {
        if (object[field] && field != ignore) {
            delete object[field]
        }
    }
}

export = routerDenounces;