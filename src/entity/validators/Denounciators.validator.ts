import { DenunciatorObject } from "../../interfaces/entity/Interface";
import { ValidateEntity } from "./ValidateEntity";

export class DenunciatorValidate extends ValidateEntity {
    constructor(denunciator: DenunciatorObject) {
        super(denunciator);
        this.requiredFields = [
            { "name": ["require", { "str:min": 10 }, { "str:max": 50 }] },
            { "cpf": ["require", "onlyNumbers", { "num:min": 11 }, { "num:max": 11 }] },
        ]
    }
}
