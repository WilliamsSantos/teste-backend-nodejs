import { EntityManager } from "typeorm";
import { Denunciators } from "../../../entity";
import { BaseController } from "./AbstractBaseController";
import { DenunciatorObject, DenunciatorCreated } from "../../../interfaces/entity/Interface";

export class DenounciatorController extends BaseController {
    entity: Denunciators;

    constructor(data: DenunciatorObject) {
        super(new Denunciators(data));
    }

    save = async (transaction?: EntityManager): Promise<DenunciatorCreated> => {
        return await this.store(transaction);
    }
}