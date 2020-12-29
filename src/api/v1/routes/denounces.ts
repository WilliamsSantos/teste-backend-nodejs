import { Request, Response, Router } from "express";
import { getConnection } from "typeorm";
import { log, errorResponse, removeUnnecessaryFields } from "../../../utils/util";
import {
    DenounceController,
    AddressController,
    GeoController,
    DenounciatorController
} from "../controller";

import { address, denounce, denounciator, geoLocation } from "../../../entity/interface";
import { requestDenounce, responseDenounce } from "./interfaces";
import * as rateLimit from "express-rate-limit";
import * as slowDown from "express-slow-down";
import { Audit } from "../../../entity";

const routerDenounces = Router();

const requestLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 }),
    speedRequestLimiter = slowDown({
        windowMs: 15 * 60 * 1000, // 15 minutes
        delayAfter: 100, // allow 100 requests per 15 minutes, then...
        delayMs: 500 // begin adding 500ms of delay per request above 100:
    });
routerDenounces.post('/', requestLimiter, speedRequestLimiter, async (req: Request, res: Response): Promise<void> => {
    const { denounces, denunciator, longitude, latitude }: requestDenounce = req.body;

    let denouncesSave: denounce, denunciatorSave: denounciator, addressSave: address //,addressFinded: any;

    try {
        await getConnection().transaction("SERIALIZABLE", async transactionalEntityManager => {
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

            transactionalEntityManager.save(
                new Audit({
                    cpf: denunciatorSave.cpf,
                    json_response: addressFinded['json'],
                    json_send: req.body,
                    sucess: true
                })
            );
        });

        const fieldsToRemove: Array<string> = [
            'id', 'created_at', 'updated_at', 'address_id', 'denunciator_id', 'tableName', 'lat', 'lng'
        ];
        denunciatorSave = removeUnnecessaryFields(denunciatorSave, fieldsToRemove);
        denouncesSave = removeUnnecessaryFields(denouncesSave, fieldsToRemove, 'id');
        addressSave = removeUnnecessaryFields(addressSave, fieldsToRemove);

        const responseJson: responseDenounce = {
            id: denouncesSave['id'],
            latitude: latitude,
            longitude: longitude,
            denunciator: denunciatorSave,
            denounces: denouncesSave,
            address: addressSave
        };

        responseJson.denounces = removeUnnecessaryFields(responseJson.denounces, 'id');

        res.status(201).json(responseJson);
    } catch (error) {
        const errors = errorResponse(error)
        log('error', `Erro message: ${JSON.stringify(errors)}`);
        res.status(400).json(errors);
    }
});

export = routerDenounces;