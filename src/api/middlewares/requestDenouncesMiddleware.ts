import express = require("express");
import { log } from "../../utils/util";
import { errorResponse } from "../../utils/util";
import { requestApi } from "./interfaces";

export function validateRequestDenouncesMiddleware(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
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

  if (Object.keys(data).length === 0) {
    response.status(400).json(errorResponse([{ code: 0, message: 'Requisição vazia.' }]));
  } else {
    const missingFields = 
      requiredFields.filter((este, i) => Object.keys(data).indexOf(este) !== i);
    if (missingFields.length) {
      response.status(400).json(errorResponse([{ code: 0, message: `Requisição invalida, ${missingFields[0]} não encontrado.` }]));
    }
  }

  let errors: Array<object | string> = [];

  objectPropertsAccept.forEach(item => {
    if (typeof item != 'object') {
      if (!data.hasOwnProperty(item)) errors.push(item);
    } else {
      let property: string = Object.getOwnPropertyNames(item)[0];
      for (let i of item[property]) {
        if (!data[property].hasOwnProperty(i)) errors.push(item);
      }
    }
  });

  if (errors.length) {

    let errorsToTratment: Array<object> = []
    errors.forEach(element => {
      errorsToTratment.push({ message: `Campo ${element} requerido`, code: element })
    });

    let errRequest: Array<object> = errorResponse(errorsToTratment);
    log('error', `Request middleware error: ${JSON.stringify(errRequest)}`);

    return response.status(400).json(errRequest);
  } else {
    request.body = translateRequestToEnglish(data);
    next();
  };
}

function translateRequestToEnglish(data: requestApi) {
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