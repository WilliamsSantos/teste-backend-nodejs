import { log } from "../../../utils/util";
import { Denounces } from "../../../entity";
import { denounce } from "../../../entity/interface";

export class DenounceController {
    private entity: Denounces;

    constructor(data: denounce) {
        this.entity = new Denounces(data);
    }

    save = async (transation?: any): Promise<denounce> => {
        try {
            this.entity.validate();

            return await transation.save(this.entity);
        } catch (error) {
            log('error', `Falha ao registrar denuncia: ${error.message}`);

            throw new Error("Falha ao registrar denuncia.");
        }
    }
}