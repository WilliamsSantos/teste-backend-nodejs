import { commonValidateEntityErrors } from "../../utils/Util";
import { denounce } from "../Interface";

export function denounceValidate(have: denounce) {
    const errors: object[] = [];

    return new Promise((resolve, reject) => {
        if (!have.title) {
            errors.push({
                code: 'Titulo',
                message: commonValidateEntityErrors('empty', 'Titulo')
            });
        }

        if (have.title && have.title.length < 10) {
            errors.push({
                code: 'Titulo',
                message: commonValidateEntityErrors('str:min', 'Titulo', 10)
            });
        }

        if (have.title && have.title.length > 35) {
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

        if (have.description && have.description.length < 35) {
            errors.push({
                code: 'Descrição',
                message: commonValidateEntityErrors('str:min', 'Descrição', 35)
            });
        }

        if (have.description && have.description.length > 355) {
            errors.push({
                code: 'Descrição Muito Grande',
                message: commonValidateEntityErrors('str:max', 'Descrição', 355)
            });
        }
        if (!have.address_id) {
            errors.push({
                code: 'Endereço',
                message: commonValidateEntityErrors('empty', 'Endereço')
            });
        }
        if (!have.denunciator_id) {
            errors.push({
                code: 'Denunciante',
                message: commonValidateEntityErrors('empty', 'Denunciante')
            });
        }
        errors.length ? reject(errors) : resolve(true);
    })
} 