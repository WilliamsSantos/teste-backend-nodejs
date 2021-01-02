import { DenunciatorObject } from "../../interfaces/entity/Interface";
import { ValidateEntity } from "./ValidateEntity";

export class DenunciatorValidate extends ValidateEntity {
    constructor(denunciator: DenunciatorObject) {
        super(denunciator);
        this.requiredFields = [
            { 'name': ['require', { 'min': 10 }, { 'max': 50 }] },
            { 'cpf': ['require', { 'min': 11 }, { 'max': 11 }] },
        ]
    }
}
