import { getManager } from "typeorm";
import { Address } from "../entity";
import { address } from "../entity/interface";

export class AddressModel extends Address {
    async save(data: address){
        this.validate(data);

        try {
 
            const entityCreated = await getManager().save(data);

            // exec the log
            return entityCreated;
        } catch (error) {
            // exec the log            
        }
    }
}
