import { address } from "../../../entity/Interface";
import { Addresses } from "../../../entity";
import { BaseController } from "./AbstractBaseController";
import { EntityManager } from "typeorm";

export class AddressController extends BaseController {
    entity: Addresses;

    constructor(data: address) {
        super(new Addresses(data));
    }

    save = async (transaction?: EntityManager): Promise<address> => {
        return await this.store(transaction);
    }
}