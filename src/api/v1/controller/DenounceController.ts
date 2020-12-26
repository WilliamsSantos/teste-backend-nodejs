import { getManager } from "typeorm"; 
import { log } from "../../../utils/util";
import { Denounces } from "../../../entity";
import { denounce } from "../../../entity/interface";

export class DenounceController {
    entity:Denounces;

    constructor(data:denounce){
        this.entity = new Denounces(data);
    }

    save = async (): Promise<denounce> => {
        try {
            // this.entity.validate();

            return await getManager().save(this.entity);

        } catch (error) {
            console.log(error);
            log('error', `Error in denounce register: ${error.message}`);
            throw new Error("Falha ao registrar o denunciante.");
        }
    }
}