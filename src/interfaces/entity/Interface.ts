export interface DenounceObject { 
    title: string, 
    address_id: number, 
    description: string 
    denunciator_id: number, 
}

export interface DenounceCreated {
    id: number,
    title: string,
    description: string,
    denunciator_id: number,
    address_id: number
}

export interface DenunciatorObject {
    name: string,
    cpf: string
}

export interface DenunciatorCreated {
    id: number,
    name: string,
    cpf: string
}

export interface Address {
    lat: number,
    lng: number,
    street: string,
    neightborhood: string,
    city: string,
    state: string,
    country: string,
    postal_code: string
}

export interface AddressObject extends Address {
    json: object
}

export interface AddressCreated {
    id: number,
    lat: number,
    lng: number,
    street: string,
    neightborhood: string,
    city: string,
    state: string,
    country: string,
    postal_code: string
}

export interface Log {
    cpf: string,
    json_reponse: string,
    json_request: string,
    created_at: Date,
}

export interface GeoLocation {
    lat: number,
    lng: number
}

export interface AuditObject {
    cpf: string;
    json_response: string;
    json_send: string,
    sucess: boolean
} 

export interface ErrorCodeObject {
    code:number, 
    description: string
}