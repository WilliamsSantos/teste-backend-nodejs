import { DenounceObject } from "../../interfaces/entity/Interface";
import { ValidateEntity } from "./ValidateEntity";

export class DenounceValidate extends ValidateEntity {
    constructor(denounce: DenounceObject) {
        super(denounce);
        this.requiredFields = [
            { 'title': ['require', { 'min': 10 }, { 'max': 35 }] },
            { 'description': ['require', { 'min': 35 }, { 'max': 355 }] },
            { 'address_id': ['require'] },
            { 'denunciator_id': ['require'] }
        ];
    }
}
