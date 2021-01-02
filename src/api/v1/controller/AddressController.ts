import { Addresses } from "../../../entity";
import { Address, AddressCreated } from "../../../interfaces/entity/Interface";
import { BaseController } from "./AbstractBaseController";
import { EntityManager } from "typeorm";

export class AddressController extends BaseController {
    entity: Addresses;

    constructor(data: Address) {
        super(new Addresses(data));
    }

    save = async (transaction?: EntityManager): Promise<AddressCreated> => {
        return await this.store(transaction);
    }
}