import { denounciator } from "../../../entity/interface";
import { Denunciators } from "../../../entity";
import { log } from "../../../utils/util";

export class DenounciatorController {
    private entity: Denunciators;

    constructor(data: denounciator) {
        this.entity = new Denunciators(data);
    }

    save = async (transaction?: any): Promise<denounciator> => {
        try {
            this.entity.validate();

            return await transaction.save(this.entity);
        } catch (error) {
            log('error', `Falha ao registrar o denunciante: ${error.message}`);

            throw new Error("Falha ao registrar o denunciante.");
        }
    }
}