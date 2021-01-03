import { Address, DenounceObject, DenounceCreated, DenunciatorObject, DenunciatorCreated } from "../entity/Interface";

export interface RequestDenounce {
    latitude: number,
    longitude: number,
    denunciator: DenunciatorObject,
    denounces: DenounceObject
}

export interface RequestEnglishTranslateDenounce {
    latitude: number,
    longitude: number,
    denunciator: {
        name: string,
        cpf: number
    },
    denounces: {
        description: string,
        title: string,
    }
}

export interface ResponseDenounce {
    id: number,
    latitude: number,
    longitude: number,
    denunciante: {
        nome: string,
        cpf: string
    },
    denuncia: {
        titulo: string,
        descricao: string,
    },
    endereco: {
        logradouro: string,
        bairro: string,
        cidade: string,
        estado: string,
        pais: string,
        codigo_postal: string
    }
}

export interface BruteObjectsDenounces {
    address: Address;
    denounce: DenounceCreated;
    denunciator: DenunciatorCreated;
}
