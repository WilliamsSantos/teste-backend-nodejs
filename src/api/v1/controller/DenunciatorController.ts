import { getManager } from "typeorm"; 

import { denounciator } from "../../../entity/interface";
import { Denunciators } from "../../../entity";
import { log } from "../../../utils/util";

export class DenounciatorController {
    entity: Denunciators;

    constructor(data: denounciator){
        this.entity = new Denunciators(data);
    }

    save = async (): Promise<denounciator> => {
        try {
            // this.entity.validate();
            console.log('SAVE ENTITU ===> ', this.entity)

            return await getManager().save(this.entity);

        } catch (error) {
            console.log(error);
            log('error', `Error in denounce register: ${error.message}`);
            throw new Error("Falha ao registrar o denunciante.");
        }
    }
}