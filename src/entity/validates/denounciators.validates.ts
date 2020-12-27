import { denounciator } from "../interface";

const errors: object[] = [];

export function denounciatorValidate(element: denounciator) {
    if (element.cpf) {
        errors.push({
            title: 'Sem Cpf',
            description:  'Cpf não informado.'
        });
    }
    if (element.name) {
        errors.push({
            title: 'Sem Nome',
            description:  'Nome não informado.'
        });
    }
    if (errors.length) {
    }
} 