import { getManager } from "typeorm";
import { Denounces } from "../entity";
import { denounce } from "../entity/interface";

export class DenouncesModel extends Denounces {
    async save(data: denounce){
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