import { Request, Response, Router } from "express";
import { getConnection } from "typeorm";
import { log, errorResponse, mountObjectToResponseFrom } from "../../../utils/Util";
import {
    DenounceController,
    AddressController,
    GeoController,
    DenunciatorController
} from "../controller";
import { 
    AddressCreated, 
    DenounceCreated, 
    DenunciatorCreated, 
    GeoLocation 
} from "../../../interfaces/entity/Interface";
import { RequestDenounce, ResponseDenounce } from "../../../interfaces/router/Interfaces";
import * as rateLimit from "express-rate-limit";
import * as slowDown from "express-slow-down";
import { Audit } from "../../../entity";
import { handlerRequestsConfig, limitsRequestConfig } from "../../../config/Configurations";

const requestLimiter = rateLimit({
    windowMs: limitsRequestConfig.maxRequestPermit, 
    max: limitsRequestConfig.minutes 
}),
speedRequestLimiter = slowDown({
    windowMs: handlerRequestsConfig.minutesToDelayRequestBegin,
    delayAfter: handlerRequestsConfig.requestsAllowMinutesConfig, 
    delayMs: handlerRequestsConfig.startDelayPerRequestAbove 
});

const routerDenounces = Router();
routerDenounces.post('/', requestLimiter, speedRequestLimiter, async (req: Request, res: Response): Promise<void> => {
    const { denounces, denunciator, longitude, latitude }: RequestDenounce = req.body;

    let denouncesSave: DenounceCreated, denunciatorSave: DenunciatorCreated, addressSave: AddressCreated;

    try {
        await getConnection().transaction("SERIALIZABLE", async transactionalEntityManager => {
            denunciatorSave =
                await new DenunciatorController(denunciator)
                    .store(transactionalEntityManager);

            const coordenadas: GeoLocation = { lng: longitude, lat: latitude };
            let addressFound =
                await new GeoController(coordenadas)
                    .getAddress();

            addressSave =
                await new AddressController(addressFound)
                    .store(transactionalEntityManager);

            denounces.address_id = addressSave.id;
            denounces.denunciator_id = denunciatorSave.id;
            denouncesSave =
                await new DenounceController(denounces)
                    .store(transactionalEntityManager);

            transactionalEntityManager.save(
                new Audit({
                    cpf: denunciatorSave.cpf,
                    json_response: JSON.stringify(addressFound.json),
                    json_send: JSON.stringify(req.body),
                    sucess: true
                })
            );
        });

        const responseJson: ResponseDenounce = mountObjectToResponseFrom({
            address: addressSave,
            denounce: denouncesSave,
            denunciator: denunciatorSave,
        });

        res.status(201).json(responseJson);
    } catch (error) {
        const errors = errorResponse(error);
        log('error', `Erro message: ${JSON.stringify(errors)}`);
        res.status(400).json(errors);
    }
});

export = routerDenounces;