import { logger } from "../../logs";

export function log(type:string, message:string | object) :void {
    logger[type](message);
}

export function errorResponse(errors: Array<object>): Array<object> {
    let errorsMessage:Array<any> = []; 
    errors.forEach(item => {
        errorsMessage.push({ message: item['message'], code: item['code'] });        
    });
    return errorsMessage;
}

export function errorTratment(errors: any): Array<object> {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    let errorArray = [];
    for (const item of errors) {
        switch (item) {
            case '0': errorArray.push(); break;
            case '0': errorArray.push(); break;
            case '0': errorArray.push(); break;
            case '0': errorArray.push(); break;
            case '0': errorArray.push(); break;
            case '0': errorArray.push(); break;
            default: break;
        }   
    }
    return errorArray;
}