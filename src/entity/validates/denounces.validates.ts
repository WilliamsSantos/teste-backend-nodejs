import { commonValidateEntityErrors } from "../../utils/util";
import { denounce } from "../interface";

const errors: object[] = [];

export function denounceValidate(have: denounce) {
    return new Promise((resolve, reject) => {
        if (!have.title) {
            errors.push({
                code: 'Titulo',
                message: commonValidateEntityErrors('empty', 'Titulo')
            });
        }

        if (have.title.length < 10) {
            errors.push({
                code: 'Titulo',
                message: commonValidateEntityErrors('str:min', 'Titulo', 10)
            });
        }

        if (have.title.length > 35) {
            errors.push({
                code: 'Titulo',
                message: commonValidateEntityErrors('str:max', 'Titulo', 35)
            });
        }

        if (!have.description) {
            errors.push({
                code: 'Descrição',
                message: 'Todas as denuncias precisam de 1 descrição.'
            });
        }

        if (have.description.length < 35) {
            errors.push({
                code: 'Descrição',
                message: commonValidateEntityErrors('str:min', 'Descrição', 35)
            });
        }

        if (have.description.length > 100) {
            errors.push({
                code: 'Descrição Muito Grande',
                message: commonValidateEntityErrors('str:max', 'Descrição', 100)
            });
        }

        errors.length ? reject(errors) : resolve(true);
    })
} 