import { Denounces } from "../../../entity";
import { denounce } from "../../../entity/interface";
import { BaseController } from "./abstractBaseController";
import { EntityManager } from "typeorm";

export class DenounceController extends BaseController {
    entity: Denounces;

    constructor(data: denounce) {
        super(new Denounces(data))
    }

    save = async (transaction?: EntityManager): Promise<denounce> => {
        return await this.store(transaction)
    }
}