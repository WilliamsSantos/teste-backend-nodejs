import { RequestApi } from "../../interfaces/middleware/Interfaces";
import { RequestEnglishTranslateDenounce } from "../../interfaces/router/Interfaces";

export const requiredFieldsArray = [
    "latitude",
    "longitude",
    "denunciante",
    "denuncia"
];

export const propertiesAcceptsArray = [
    "latitude",
    "longitude",
    {
        "denunciante": [
            "nome",
            "cpf"
        ]
    },
    {
        "denuncia": [
            "titulo",
            "descricao"
        ]
    }
];

export function translateRequestToEnglish(data: RequestApi): RequestEnglishTranslateDenounce {
    return {
        "latitude": data.latitude,
        "longitude": data.longitude,
        "denunciator": {
            "name": data.denunciante.nome,
            "cpf": data.denunciante.cpf
        },
        "denounces": {
            "description": data.denuncia.descricao,
            "title": data.denuncia.titulo,
        }
    }
}