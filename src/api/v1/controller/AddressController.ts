import { Addresses } from "../../../entity";
import { Address, AddressCreated } from "../../../interfaces/entity/Interface";
import { BaseController } from "./AbstractBaseController";

export class AddressController extends BaseController {
    entity: Addresses;

    constructor(data: Address) {
        super(new Addresses(data));
    }
}