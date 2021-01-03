import * as express from "express";
import { log } from "../../utils/Util";
import { errorResponse } from "../../utils/Util";
import { RequestApi } from "../../interfaces/middleware/Interfaces";

export function validateRequestDenouncesMiddleware(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
):void {
  const data = request.body;
  const objectPropertsAccept = [
    'latitude',
    'longitude',
    {
      'denunciante': [
        'nome',
        'cpf'
      ]
    },
    {
      'denuncia': [
        'titulo',
        'descricao'
      ]
    },
  ];

  const requiredFields = ['latitude', 'longitude', 'denunciante', 'denuncia'];
  const errors = [];

  if (Object.keys(data).length === 0) {
    response.status(400).json({ code: 0, message: 'Requisição vazia.' })
  } else {
    const missingFields =
      requiredFields.filter((este, i) => Object.keys(data).indexOf(este) !== i);
    if (missingFields.length) {
      response.status(400).json({ code: 0, message: `Requisição invalida, ${missingFields[0]} não encontrado.` })
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

function translateRequestToEnglish(data: RequestApi) {
  return {
    'latitude': data.latitude,
    'longitude': data.longitude,
    'denunciator': {
      'name': data.denunciante.nome,
      'cpf': data.denunciante.cpf
    },
    'denounces': {
      'description': data.denuncia.descricao,
      'title': data.denuncia.titulo,
    }
  }
}