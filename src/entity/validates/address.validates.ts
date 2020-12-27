import { address } from "../interface";

const errors: object[] = [];

export function addressValidate( element: address ) {
    if (element.city) {
        errors.push({
            title: 'Sem Cidade',
            description: 'Cidade não informada.'
        });
    }

    if (element.country) {
        errors.push({
            title: 'Sem pais',
            description: 'Pais não informado.'
        });
    }

    if (element.neightborhood) {
        errors.push({
            title: 'Sem Logradouro',
            description: 'Logradouro não informado.'
        });
    }

    if (element.postal_code) {
        errors.push({
            title: 'Sem Caixa Postal',
            description: 'Caixa Postal não informada.'
        });
    }

    if (element.state) {
        errors.push({
            title: 'Sem Estado',
            description: 'Estado não informado.'
        });
    }

    if (element.street) {
        errors.push({
            title: 'Sem Rua',
            description: 'Rua não informado.'
        });
    }

    if (errors.length) {
    }
} 