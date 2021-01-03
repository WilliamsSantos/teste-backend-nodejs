import { commonValidateEntityErrors, translateFieldToPtBr, validators } from "../../utils/Util";
import { ErrorObjectStructure, PropertyMountObject, ValidateEntityMethods } from "../../interfaces/validator/Interface";

/**
 * Types of fields accepts and treatments
 * ex: [ 'require', 'only:numbers', {  'max'/'min' : x } ]
 */

export class ValidateEntity implements ValidateEntityMethods {
    requiredFields;
    entity;

    constructor(Entity) {
        this.entity = Entity;
    }

    validate(): Promise<Error> {
        const errors: ErrorObjectStructure[] = [];
        try {
            for (const field of this.requiredFields) {
                let isNotValid = false;
                Object.keys(field).map(item => {
                    if (Object.prototype.hasOwnProperty.call(this.entity, item)) {
                        for (const rule of field[item]) {
                            if (typeof rule === 'object') {
                                if (Object.prototype.hasOwnProperty.call(rule, 'min')) {
                                    isNotValid = validators['min'](this.entity[item], rule['min']);
                                    if (isNotValid)
                                        errors.push(this.mountObjectError(translateFieldToPtBr(item), { key: 'str:min', value: rule['min'] }));
                                }
                                if (Object.prototype.hasOwnProperty.call(rule, 'max')) {
                                    isNotValid = validators['max'](this.entity[item], rule['max']);
                                    if (isNotValid)
                                        errors.push(this.mountObjectError(translateFieldToPtBr(item), { key: 'str:max', value: rule['max'] }));
                                }
                            } else {
                                switch (rule) {
                                    case 'require':
                                        isNotValid = validators[rule](this.entity[item]);
                                        if (isNotValid)
                                            errors.push(this.mountObjectError(translateFieldToPtBr(item), { key: 'empty', value: null }));
                                        break;
                                    case 'onlyNumbers':
                                        isNotValid = validators[rule](this.entity[item]);
                                        if (isNotValid)
                                            errors.push(this.mountObjectError(translateFieldToPtBr(item), { key: 'onlyNumbers', value: null }));
                                        break
                                }
                            continue;
                            }
                        }
                    } else {
                        errors.push(this.mountObjectError(translateFieldToPtBr(item), { key: 'empty', value:null }));
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
            errorMessage = value !== null
                ? commonValidateEntityErrors(key, codeError, value)
                : commonValidateEntityErrors(key, codeError);
        return {
            code: codeError,
            message: errorMessage
        };
    }
}
