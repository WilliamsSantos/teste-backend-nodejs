import { getRepository } from "typeorm";
import { logger } from "../../logs";
import { ErrorCodes } from "../entity";

export function log(type: string, message: string | object): void {
    logger[type](message);
}

export function errorResponse(errors: any): Array<object> {
    let errorsMessage: Array<any> = [];

    if (!Array.isArray(errors)) errors = [{ message: errors, code: 0 }];

    errors.forEach((item: { [x: string]: any; }) => {
        errorsMessage.push({ message: item['message'], code: item['code'] });
    });
    return errorsMessage;
}

export async function errorTratmentToCode(errorCode: number) {
    try {
        const errorRepository = getRepository(ErrorCodes),
            errorHandled = await errorRepository.find({
                code: Number(errorCode)
            });
        if (!errorHandled.length) {
            return communErrors['standard'];
        }
        return errorHandled;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const communErrors: object = {
    'addressNotFound': 0,
    'standard': 'Falha interna, tente novamente mais tarde'
}