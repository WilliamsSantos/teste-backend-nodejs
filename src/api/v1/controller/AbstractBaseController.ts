import { EntityManager } from "typeorm";
import { AddressCreated, DenunciatorCreated, DenounceCreated, } from "../../../interfaces/entity/Interface";
import { log } from "../../../utils/Util";

interface BaseFunctions {
    validate: () => Promise<Error>;
    getTableName: () => string;
}
type BaseObjectsType = AddressCreated | DenunciatorCreated | DenounceCreated | BaseFunctions;

export abstract class BaseController {
    entity;
    constructor(Model: BaseObjectsType) {
        this.entity = Model;
    }

    store = async (transaction: EntityManager): Promise<unknown> => {
        try {
            await this.entity.validate();
            return await transaction.save(this.entity);
        } catch (error) {
            log("error", `Falha ao salvar registro na entidade ${this.entity.getTableName()}: ${JSON.stringify(error)}`);
            throw error;
        }
    }
} 