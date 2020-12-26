import { denounce } from "../interface";

const errors: object[] = [];

export function denounceValidate (have: denounce) {

    if (!have.title) {
        errors.push({
            title: 'Sem Titulo',
            description: 'Você precisa dar um titulo a sua denuncia.'
        });
    }

    if (have.title.length < 20) {
        errors.push({
            title: 'Titulo Muito Pequeno',
            description: 'O Titulo precisa ter no minimo 20 letras.'
        });
    }

    if (have.title.length > 35) {
        errors.push({
            title: 'Titulo Muito Grande',
            description: 'O Titulo precisa ter no máximo 35 letras.'
        });
    }

    if (!have.description) {
        errors.push({
            title: 'Sem Descrição',
            description: 'Todas as denuncias precisam de 1 descrição.'
        });
    }

    if (have.description.length < 35) {
        errors.push({
            title: 'Descrição Pequena',
            description:  'A Descrição precisa ter no minimo 35 letras.'
        });
    }

    if (have.description.length > 100) {
        errors.push({
            title: 'Descrição Muito Grande',
            description:  'A Descrição precisa ter no maximo 100 letras.'
        });
    }

    if (errors.length) {
    }
} 