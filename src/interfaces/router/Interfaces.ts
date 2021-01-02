import { Address, DenounceObject, DenounceCreated, DenunciatorObject, DenunciatorCreated } from "../entity/Interface";

export interface RequestDenounce {
    latitude: number,
    longitude: number,
    denunciator: DenunciatorObject,
    denounces: DenounceObject
}

export interface ResponseDenounce {
    id: number,
    latitude: number,
    longitude: number,
    denunciator: {
        name: string,
        cpf: string
    },
    denounces: {
        title: string,
        description: string,
    },
    address: {
        street: string,
        neightborhood: string,
        city: string,
        state: string,
        country: string,
        postal_code: string
    }
}

export interface BruteObjectsDenounces { 
    address: Address; 
    denounce: DenounceCreated; 
    denunciator: DenunciatorCreated; 
}
