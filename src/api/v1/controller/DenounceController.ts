import { Denounces } from "../../../entity";
import { denounce } from "../../../entity/Interface";
import { BaseController } from "./AbstractBaseController";
import { EntityManager } from "typeorm";

export class DenounceController extends BaseController {
    entity: Denounces;

    constructor(data: denounce) {
        super(new Denounces(data));
    }

    save = async (transaction?: EntityManager): Promise<denounce> => {
        return await this.store(transaction);
    }
}