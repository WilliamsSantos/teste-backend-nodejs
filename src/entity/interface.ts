export interface denounce {
    title: string,
    description: string,
    denunciator_id: number,
    address_id: number
}

export interface denounciator {
    name: string,
    cpf: string
}

export interface address {
    lat: number,
    lng: number,
    street: string,
    neightborhood: string,
    city: string,
    state: string,
    country: string,
    postal_code: string
}

export interface log {
    cpf: string,
    json_reponse: string,
    json_request: string,
    created_at: Date,
}

export interface geoLocation {
    lat: number,
    lng: number
} 