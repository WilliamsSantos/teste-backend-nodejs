import { Address } from "../../interfaces/entity/Interface";
import { ValidateEntity } from "./ValidateEntity";

export class addressValidate extends ValidateEntity {
    constructor(address: Address) {
        super(address);
        this.requiredFields = [
            { 'city': ['require', { 'str:max': 10 }] },
            { 'country': ['require'] },
            { 'state': ['require'] }
        ];
    }
}
