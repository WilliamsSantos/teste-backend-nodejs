export interface ValidatorsFunctions {
    require: (item: string) => boolean;
    min: (item: string, min: number) => boolean;
    max: (item: string, max: number) => boolean;
};

export interface ErrorObjectStructure {
    code: string,
    message: string
};

export interface PropertyMountObject { 
    key: string; 
    value?: string; 
};

export interface ValidateEntityMethods {
    requiredFields: Array<object>;
    validate: () => Promise<Error>;
    mountObjectError: (errorCode: string, property: PropertyMountObject) => ErrorObjectStructure;
};

export interface TreatedAuditObject { 
    json_response: string, 
    json_send: string, 
    cpf: string 
};

export interface TreatedDenounceObject { 
    address_id: number, 
    denunciator_id: number, 
    title: string,
    description: string
}