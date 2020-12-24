import { getManager } from "typeorm";
import { Denunciators } from "../entity";
import { denounciator } from "../entity/interface";

export class DenunciatorModel extends Denunciators {
    async save(data: denounciator){
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