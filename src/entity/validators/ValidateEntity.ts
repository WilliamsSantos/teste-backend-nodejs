/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { commonValidateEntityErrors, translateFieldToPtBr, validators } from "../../utils/Util";
import { ErrorObjectStructure, PropertyMountObject, ValidateEntityMethods } from "../../interfaces/validator/Interface";
import { entityErrors } from "../../utils/EnumEntityError";

/**
 * Types of fields accepts and treatments
 * ex: [ 'require', 'only:numbers', {  'num:max'/'num:min' or 'str:min'/'str:max' : x } ]
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
                Object.keys(field).map(item => {
                    if (Object.prototype.hasOwnProperty.call(this.entity, item)) {
                        for (const rule of field[item]) {
                            const response = this.typeRuleVerify(item, rule);
                            if (response) errors.push(response);
                            else continue;
                        }
                    } else {
                        errors.push(this.mountObjectError(translateFieldToPtBr(item), { key: 'empty', value: null }));
                    }
                });
            }
            if (errors.length) {
                throw errors;
            } else {
                return;
            }
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }
    }

    typeRuleVerify(item: string, rule: { [x: string]: string | number; }): ErrorObjectStructure {
        let isNotValid = false, objectResponse: ErrorObjectStructure;
        const rulesTypes = Object.keys(entityErrors);
        for (const type of rulesTypes) {
            if (Object.prototype.hasOwnProperty.call(rule, type) || String(rule).match(type)) {
                const validate: string =
                    type.indexOf(':') != -1
                        ? /:\w.+/g.exec(type)[0].replace(':', '')
                        : type;

                isNotValid = validators[validate](this.entity[item], rule[type]);

                if (isNotValid)
                    if (type.match(/num:/) || type.match(/str:/)) {
                        objectResponse = this.mountObjectError(translateFieldToPtBr(item), { key: type, value: rule[type] });
                    } else {
                        objectResponse = this.mountObjectError(translateFieldToPtBr(item), { key: type, value: null });
                    }
            }
        }
        return objectResponse;
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
