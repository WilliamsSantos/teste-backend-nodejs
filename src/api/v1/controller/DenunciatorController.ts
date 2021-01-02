import { denounciator } from "../../../entity/Interface";
import { Denunciators } from "../../../entity";
import { BaseController } from "./AbstractBaseController";
import { EntityManager } from "typeorm";

export class DenounciatorController extends BaseController {
    entity: Denunciators;

    constructor(data: denounciator) {
        super(new Denunciators(data));
    }

    save = async (transaction?: EntityManager): Promise<denounciator> => {
        return await this.store(transaction);
    }
}