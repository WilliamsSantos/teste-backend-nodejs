import { address } from "../../../entity/interface";
import { Addresses } from "../../../entity";
import { BaseController } from "./abstractBaseController";
import { EntityManager } from "typeorm";

export class AddressController extends BaseController {
    entity: Addresses;

    constructor(data: address) {
        super(new Addresses(data))
    }

    save = async (transaction?: EntityManager): Promise<address> => {
        return await this.store(transaction)
    }
}