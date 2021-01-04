export interface ValidatorsFunctions {
    require: (item: string) => boolean;
    min: (item: string, min: number) => boolean;
    max: (item: string, max: number) => boolean;
    onlyNumbers: (item: number | string) => boolean;
}

export interface ErrorObjectStructure {
    code: string,
    message: string
}

export interface PropertyMountObject {
    key: string;
    value: string | number;
}

export interface ValidateEntityMethods {
    requiredFields: ({ city: (string | { max: number; })[]; country?: undefined; state?: undefined; } | { country: string[]; city?: undefined; state?: undefined; } | { state: string[]; city?: undefined; country?: undefined; })[] | ({ title: (string | { min: number; max?: undefined; } | { max: number; min?: undefined; })[]; description?: undefined; address_id?: undefined; denunciator_id?: undefined; } | { description: (string | { min: number; max?: undefined; } | { max: number; min?: undefined; })[]; title?: undefined; address_id?: undefined; denunciator_id?: undefined; } | { address_id: string[]; title?: undefined; description?: undefined; denunciator_id?: undefined; } | { denunciator_id: string[]; title?: undefined; description?: undefined; address_id?: undefined; })[] | ({ name: (string | { min: number; max?: undefined; } | { max: number; min?: undefined; })[]; cpf?: undefined; } | { cpf: (string | { min: number; max?: undefined; } | { max: number; min?: undefined; })[]; name?: undefined; })[];
    validate: () => Promise<Error>;
    mountObjectError: (errorCode: string, property: PropertyMountObject) => ErrorObjectStructure;
    typeRuleVerify: (item: string, rule: { [x: string]: string | number; }) => ErrorObjectStructure;
}

export interface TreatedAuditObject {
    json_response: string,
    json_send: string,
    cpf: string
}

export interface TreatedDenounceObject {
    address_id: number,
    denunciator_id: number,
    title: string,
    description: string
}