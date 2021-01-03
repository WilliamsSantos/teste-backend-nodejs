import { getRepository } from "typeorm";
import { logger } from "../../logs";
import { ErrorCodes } from "../entity";
import { BruteObjectsDenounces, ResponseDenounce } from "../interfaces/router/Interfaces";
import { ValidatorsFunctions } from "../interfaces/validator/Interface";
import { entityErrors } from "./EnumEntityError";

export function log(type: string, message: string | object): void {
    logger[type](message);
}

export function translateFieldToPtBr(fieldToTranslate: string): string {
    let field: string = "";
    const fields: string[] = [
        "latitude:Latitude",
        "state:Estado",
        "longitude:Longitude",
        "denunciator_id:Denunciante",
        "name:Nome",
        "denounce:Denuncia",
        "address_id:Endereço",
        "city:Cidade",
        "description:Descricao",
        "title:Titulo",
        "cpf:cpf"
    ];
    for (const item of fields) {
        if (item.indexOf(fieldToTranslate) != -1) {
            field = /:(\w)+/g.exec(item)[0].replace(':', '');
        }
    }
    return field;
};

export function errorResponse(errors: any): object {
    let errorsMessage = { errors: [] };

    if (errors && errors['message']) errors = errors['message'];
    if (typeof errors === 'string') errors = JSON.parse(errors);
    if (!Array.isArray(errors)) errors = [{ message: errors, code: 0 }];

    errors.forEach((item: { [x: string]: any; }) => {
        let errObj = {};
        errObj['code'] = (item['code']) ? item['code'] : 0;
        errObj['message'] = (item['message']) ? item['message'] : 'Falha na requisição.';
        errorsMessage.errors.push(errObj);
    });

    return errorsMessage;
}

// Not finished
export async function errorTratmentToCode(errorCode: number) {
    try {
        const errorRepository = getRepository(ErrorCodes),
            errorHandled = await errorRepository.find({
                code: Number(errorCode)
            });
        if (!errorHandled.length) {
            // return communErrors['standard'];
        }
        return errorHandled;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const commonValidateEntityErrors = (errorType: string, field?: string, property?: string | number) => {
    const errorsProperty = Object.getOwnPropertyNames(entityErrors);
    if (errorsProperty.indexOf(errorType) != -1) {
        let message = entityErrors[errorType].replace('<field>', field);
        if (property) message = message.replace('<property>', property);
        return message;
    } else {
        return "Campo inválido.";
    }
}

export function mountObjectToResponseFrom(data: BruteObjectsDenounces): ResponseDenounce {
    const { address, denounce, denunciator } = data;
    return {
        id: denounce.id,
        latitude: address.lat,
        longitude: address.lng,
        denunciante: {
            nome: denunciator.name,
            cpf: denunciator.cpf
        },
        denuncia: {
            titulo: denounce.title,
            descricao: denounce.description,
        },
        endereco: {
            logradouro: address.street,
            bairro: address.neightborhood,
            cidade: address.city,
            estado: address.state,
            pais: address.country,
            codigo_postal: address.postal_code
        }
    };
}

export const validators: ValidatorsFunctions = {
    require: (item = '') => {
        return !(item && item != null && String(item).length && item != undefined);
    },
    min: (item = '', min = 1) => {
        return item && item.length < min;
    },
    max: (item = '', max = 0) => {
        return item && item.length > max;
    },
    onlyNumbers: (item = 0) => {
        return !/^\d+$/.test(String(item));
    }
};