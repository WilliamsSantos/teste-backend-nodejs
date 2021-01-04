import {
    commonValidateEntityErrors,
    validators,
    mountObjectToResponseFrom,
    errorResponse,
    translateFieldToPtBr
} from "./Util";

describe('Test the common validate entity errors util', () => {
    it('should response with a cpf string must be minumun 11 digits', () => {
        const response = commonValidateEntityErrors('num:min', 'cpf', 11);
        expect(response).toEqual("cpf deve ter no minimo 11 digitos.");
    });
    it('should response with a cpf string must be maximun 11 digits', () => {
        const response = commonValidateEntityErrors('num:max', 'cpf', 11);
        expect(response).toEqual("cpf deve ter no máximo 11 digitos.");
    });
    it('should response with a name must be at least 2 letters long.', () => {
        const response = commonValidateEntityErrors('str:min', 'nome', 2);
        expect(response).toEqual("nome deve ter no minimo 2 letras.");
    });
    it('should response with a name must be a maximum of 35 letters.', () => {
        const response = commonValidateEntityErrors('str:max', 'nome', 35);
        expect(response).toEqual("nome deve ter no máximo 35 letras.");
    });
    it('should response with a postal code must contain only digits.', () => {
        const response = commonValidateEntityErrors('onlyNumbers', 'cep');
        expect(response).toEqual("cep deve conter apenas digitos.");
    });
    it('should response with a title is empty.', () => {
        const response = commonValidateEntityErrors('require', 'titulo');
        expect(response).toEqual("titulo não informado.");
    });
});

describe('Test the validators util', () => {
    it('should response with a boolean true if the string is empty', () => {
        const stringToTest = "";
        const emptyString = validators['require'](stringToTest);
        expect(emptyString).toBeTruthy();
    });
    it('should response with a boolean false if the string is not empty', () => {
        const stringToTest = "Not empty string";
        const notEmptyString = validators['require'](stringToTest);
        expect(notEmptyString).toBeFalsy();
    });
    it('should response with a boolean true if the string is less then 3 length', () => {
        const stringToTest = "wi";
        const stringLessThen3Length = validators['min'](stringToTest, 3);
        expect(stringLessThen3Length).toBeTruthy();
    });
    it('should response with a boolean false if the string is not less then 3 length', () => {
        const stringToTest = "will";
        const stringNotLessThen3Length = validators['min'](stringToTest, 3);
        expect(stringNotLessThen3Length).toBeFalsy();
    });
    it('should response with a boolean true if the string is more then 10 length', () => {
        const stringToTest = "williams Teste the maximun length validator";
        const stringMoreThen10Length = validators['max'](stringToTest, 10);
        expect(stringMoreThen10Length).toBeTruthy();
    });
    it('should response with a boolean false if the string is not more then 10 length', () => {
        const stringToTest = "williams S";
        const stringNoMoreThen10Length = validators['max'](stringToTest, 10);
        expect(stringNoMoreThen10Length).toBeFalsy();
    });
    it('should response with a boolean true if the string not have only numbers', () => {
        const stringToTest = "114.234.234-33";
        const stringNotHaveOnlyNumbers = validators['onlyNumbers'](stringToTest);
        expect(stringNotHaveOnlyNumbers).toBeTruthy();
    });
    it('should response with a boolean false if the string have only numbers', () => {
        const stringToTest = "11423423433";
        const stringNotHaveOnlyNumbers = validators['onlyNumbers'](stringToTest);
        expect(stringNotHaveOnlyNumbers).toBeFalsy();
    });
});

describe('Test the mount object to response util', () => {
    it('should respond with a mounted object ready to be sent to client', () => {
        const data = {
            denounce: {
                id: 1,
                title: 'title',
                description: 'description',
                denunciator_id: 0,
                address_id: 0
            },
            denunciator: {
                id: 0,
                name: 'name',
                cpf: '12345678910'
            },
            address: {
                id: 0,
                lat: 0,
                lng: 0,
                street: 'street',
                neightborhood: 'neightborhood',
                city: 'city',
                state: 'state',
                country: 'country',
                postal_code: 'postal_code'
            }
        }
        const response = mountObjectToResponseFrom(data);
        expect(response).toStrictEqual(
            {
                id: 1,
                latitude: 0,
                longitude: 0,
                denunciante: {
                    nome: 'name',
                    cpf: '12345678910'
                },
                denuncia: {
                    titulo: 'title',
                    descricao: 'description',
                },
                endereco: {
                    logradouro: 'street',
                    bairro: 'neightborhood',
                    cidade: 'city',
                    estado: 'state',
                    pais: 'country',
                    codigo_postal: 'postal_code'
                }
            }
        )
    })
});

describe('Test the error response util', () => {
    it('should respond with a single code message array', () => {
        const data = JSON.stringify("Message create only for test");
        const response = errorResponse(data);
        expect(response).toStrictEqual({
            "errors": [
                {
                    "code": 0,
                    "message": "Message create only for test"
                }
            ]
        });
    });
});

describe('Test the translate field to Pt-Br util', () => {
    it('should input denunciator string and output Denunciante translate', () => {
        const field = "denunciator";
        const result = translateFieldToPtBr(field);
        expect(result).toBe("Denunciante");
    });
    it('should input state string and output Estado translate', () => {
        const field = "state";
        const result = translateFieldToPtBr(field);
        expect(result).toBe("Estado");
    });
    it('should input denounce string and output Denuncia translate', () => {
        const field = "denounce";
        const result = translateFieldToPtBr(field);
        expect(result).toBe("Denuncia");
    });
    it('should input address_id string and output Endereço translate', () => {
        const field = "address_id";
        const result = translateFieldToPtBr(field);
        expect(result).toBe("Endereço");
    });
    it('should input description string and output Descricao translate', () => {
        const field = "description";
        const result = translateFieldToPtBr(field);
        expect(result).toBe("Descricao");
    });
})