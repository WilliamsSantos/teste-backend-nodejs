export interface TreatedAddressObject {
    lat: number,
    lng: number,
    country: string,
    state: string,
    city: string,
    neightborhood: string,
    street: string,
    postal_code: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    json: object
}