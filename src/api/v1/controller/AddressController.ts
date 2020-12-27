import { address } from "../../../entity/interface";
import { Addresses } from "../../../entity";
import { log } from "../../../utils/util";

export class AddressController {
    private entity: Addresses;

    constructor(data: address) {
        this.entity = new Addresses(data);
    }

    save = async (transaction?: any): Promise<address> => {
        try {
            this.entity.validate();

            return await transaction.save(this.entity);
        } catch (error) {
            log('error', `Falha ao registrar o endereço: ${error.message}`);

            throw new Error("Falha ao registrar o endereço.");
        }
    }
}