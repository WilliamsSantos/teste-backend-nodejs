import { Request, Response, Router } from "express";

const routerDenounces = Router();

// Criar midleware
routerDenounces.get('/', (req: Request, res: Response) => {
    res.status(200).json('Service Denounce');
});

export = routerDenounces;