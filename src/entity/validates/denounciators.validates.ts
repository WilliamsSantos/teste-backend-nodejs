import { commonValidateEntityErrors } from "../../utils/util";
import { denounciator } from "../interface";

export function denounciatorValidate(element: denounciator) {
    const errors: object[] = [];

    return new Promise((resolve, reject) => {

        if (!element.name) {
            errors.push({
                code: 'Nome',
                message: commonValidateEntityErrors('empty', 'Nome'),
            });
        }

        if (element.name && element.name.length > 25) {
            errors.push({
                code: 'Nome inválido',
                message: commonValidateEntityErrors('str:max', 'Nome', 25),
            });
        }

        if (!element.cpf) {
            errors.push({
                code: 'Cpf',
                message: commonValidateEntityErrors('empty', 'Cpf')
            });
        }

        if (element.cpf && isNaN(+element.cpf)) {
            errors.push({
                code: 'Cpf inválido',
                message: 'Cpf não deve conter caractéres especiais.'
            });
        }

        if (element.cpf && element.cpf.length != 11) {
            errors.push({
                code: 'Cpf inválido',
                message: 'Cpf deve ter 11 digitos e não deve possuir barras pontos ou qualquer caracter especial.'
            });
        }
        
        errors.length ? reject(errors) : resolve(true);
    })
} 