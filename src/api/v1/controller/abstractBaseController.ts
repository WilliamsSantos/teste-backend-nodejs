import { EntityManager } from "typeorm";
import { log } from "../../../utils/util";

export abstract class BaseController {
    entity?: any

    constructor(Model: any) {
        this.entity = Model;
    }

    abstract save(): void

    store = async (transaction?: EntityManager): Promise<any> => {
        try {
            await this.entity.validate();
            return await transaction.save(this.entity);
        } catch (error) {
            log('error', `Falha ao salvar registro na entidade ${this.entity.getTableName()}: ${JSON.stringify(error)}`);
            throw error
        }
    }
} 