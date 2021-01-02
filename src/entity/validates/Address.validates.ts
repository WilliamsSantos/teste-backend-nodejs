import { commonValidateEntityErrors } from "../../utils/Util";
import { address } from "../Interface";

export function addressValidate(have: address) {
    const errors: object[] = [];

    return new Promise((resolve, reject) => {
        if (!have.city) {
            errors.push({
                code: 'Cidade',
                message: commonValidateEntityErrors('empty', 'Cidade')
            });
        }

        if (have.city && have.city.length > 35) {
            errors.push({
                code: 'Cidade',
                message: commonValidateEntityErrors('str:max', 'Cidade', 35)
            });
        }

        if (!have.country) {
            errors.push({
                code: 'Pais',
                message: commonValidateEntityErrors('empty', 'Pais')
            });
        }

        if (!have.state) {
            errors.push({
                code: 'Estado',
                message: commonValidateEntityErrors('empty', 'Estado')
            });
        }

        errors.length ? reject(errors) : resolve(true);
    })
}