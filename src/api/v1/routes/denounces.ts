import { Request, Response, Router } from "express";
import { log } from "../../../utils/util";

const routerDenounces = Router();

// Criar midleware
routerDenounces.post('/', (req: Request, res: Response) => {
    log('info', req.body)
    res.status(200).json('Service Denounce');
});

export = routerDenounces;