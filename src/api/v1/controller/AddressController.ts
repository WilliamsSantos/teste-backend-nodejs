import { getManager } from "typeorm"; 
import { address } from "../../../entity/interface";
import { Addresses } from "../../../entity";
import { log } from "../../../utils/util";

export class AddressController {
    entity: Addresses;
 
    constructor(data:address){
        this.entity = new Addresses(data);
    }

    save = async (): Promise<address> => {
        try {
            // this.entity.validate();

            return await getManager().save(this.entity);

        } catch (error) {
            console.log(error);
            log('error', `Error in denounce register: ${error.message}`);
            throw new Error("Falha ao registrar o enderesso.");
        }
    }
}