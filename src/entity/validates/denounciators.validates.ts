import { commonValidateEntityErrors } from "../../utils/util";
import { denounciator } from "../interface";

export function denounciatorValidate(element: denounciator) {
    const errors: object[] = [];

    return new Promise((resolve, reject) => {

        if (!element.cpf) {
            errors.push({
                code: 'Cpf',
                message: commonValidateEntityErrors('empty', 'Cpf')
            });
        }

        if (!element.name) {
            errors.push({
                code: 'Nome',
                message: commonValidateEntityErrors('empty', 'Nome'),
            });
        }

        if (element.name.length > 25) {
            errors.push({
                code: 'Nome inválido',
                message: commonValidateEntityErrors('str:max', 'Nome', 25),
            });
        }

        if (element.cpf.length != 11 && typeof !isNaN(+element.cpf)) {
            errors.push({
                code: 'Cpf inválido',
                message: 'Cpf não deve conter caractéres especiais e ter no máximo 11 dígitos.'
            });
        }

        errors.length ? reject(errors) : resolve(true);
    })
} 