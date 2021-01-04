import { DenounceObject } from "../../interfaces/entity/Interface";
import { ValidateEntity } from "./ValidateEntity";

export class DenounceValidate extends ValidateEntity {
    constructor(denounce: DenounceObject) {
        super(denounce);
        this.requiredFields = [
            { "title": ["require", { "str:min": 10 }, { "str:max": 35 }] },
            { "description": ["require", { "str:min": 35 }, { "str:max": 355 }] },
            { "address_id": ["require"] },
            { "denunciator_id": ["require"] }
        ];
    }
}
