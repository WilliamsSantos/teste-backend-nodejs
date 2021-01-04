import { Request, Response, NextFunction } from "express";
import { log } from "../../utils/Util";
import { errorResponse } from "../../utils/Util";
import { propertiesAcceptsArray, requiredFieldsArray, translateRequestToEnglish } from "./request.util";

export function validateRequestDenouncesMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const data = request.body;
  const errors = [];
  const requiredFields = requiredFieldsArray;
  const objectPropertsAccept = propertiesAcceptsArray

  if (Object.keys(data).length === 0) {
    response.status(400).json({ code: 0, message: 'Requisição vazia.' })
  } else {
    const missingFields =
      requiredFields.filter((este, i) => Object.keys(data).indexOf(este) !== i);
    if (missingFields.length) {
      response.status(400).json({ code: 0, message: `Requisição inválida, ${missingFields[0]} não encontrado.` })
    }
  }

  objectPropertsAccept.forEach(item => {
    if (typeof item != 'object') {
      if (!Object.prototype.hasOwnProperty.call(data, item)) errors.push(item);
    } else {
      const property: string = Object.getOwnPropertyNames(item)[0];
      for (const i of item[property]) {
        if (!Object.prototype.hasOwnProperty.call(data[property], i)) errors.push(`${property} > ${i}`);
      }
    }
  });

  if (errors.length) {

    const errorsToTratment = []
    errors.forEach(element => {
      errorsToTratment.push({ message: `Campo ${element} requerido`, code: element })
    });

    const errRequest = errorResponse(errorsToTratment);

    log('error', `Request middleware error: ${JSON.stringify(errRequest)}`);

    response.status(400).json(errRequest);
  } else {
    request.body = translateRequestToEnglish(data);
    next();
  }
}

