import { commonValidateEntityErrors, validators } from "../../utils/Util";
import { ErrorObjectStructure, PropertyMountObject, ValidateEntityMethods } from "../../interfaces/validator/Interface";

/**
 * Types of fields accepts and treatments
 * ex: [ 'require' , {  'max'/'min' : x } ]
 */

export class ValidateEntity implements ValidateEntityMethods {
    requiredFields: Array<object> = [{}];
    entity: object;

    constructor(Entity: object) {
        this.entity = Entity;
    }

    validate(): Promise<Error> {
        const errors: ErrorObjectStructure[] = [];
        try {
            for (const field of this.requiredFields) {
                let isNotValid: boolean = false;
                Object.keys(field).map(item => {
                    if (this.entity.hasOwnProperty(item)) {
                        for (const rule of field[item]) {
                            if (typeof rule === 'object') {
                                if (rule.hasOwnProperty('min')) {
                                    isNotValid = validators['min'](this.entity[item], rule['min']);
                                    if (isNotValid)
                                        errors.push(this.mountObjectError(item, { key: 'str:min', value: rule['min'] }));
                                }
                                if (rule.hasOwnProperty('max')) {
                                    isNotValid = validators['max'](this.entity[item], rule['max']);
                                    if (isNotValid)
                                        errors.push(this.mountObjectError(item, { key: 'str:max', value: rule['max'] }));
                                }
                            } else {
                                switch (rule) {
                                    case 'require':
                                        isNotValid = validators[rule](this.entity[item]);
                                        if (isNotValid)
                                            errors.push(this.mountObjectError(item, { key: 'empty' }));
                                        break;
                                }
                            continue;
                            }
                        }
                    } else {
                        errors.push(this.mountObjectError(item, { key: 'empty' }));
                    }
                });
            }

            if (errors.length) {
                throw errors;    
            } else {
                return
            }
        } catch (error) {
            throw new Error(JSON.stringify(error)); 
        }
    }

    mountObjectError(codeError: string, property: PropertyMountObject): ErrorObjectStructure {
        const { key, value } = property,
            errorMessage = value
                ? commonValidateEntityErrors(key, codeError, value)
                : commonValidateEntityErrors(key, codeError);
        return {
            code: codeError,
            message: errorMessage
        };
    }
}
