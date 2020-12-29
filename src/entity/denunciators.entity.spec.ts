import { Denunciators } from "./Denunciators.entity";
import { createConnection } from "typeorm";

describe("Test the Denounciator Entity", () => {

    let connection = null;
    beforeAll(async () => {
        connection = await createConnection()
    });

    afterAll(async () => {
        connection.close()
    });

    test("It should be returned an error if cpf not passed", async () => {
        const dataNewDenunciator = {
            name: 'Teste Denunciator',
        }
        const create = new Denunciators(dataNewDenunciator);
        return await create.validate().catch(res => {
            expect(res).toStrictEqual([
                {
                    "code": "Cpf",
                    "message": "Cpf não informado."
                }
            ])
        });
    });
    test("It should be returned an error if name not passed", async () => {
        const dataNewDenunciator = {
            "cpf": "12345678900"
        }
        const create = new Denunciators(dataNewDenunciator);
        return await create.validate().catch(res => {
            expect(res).toStrictEqual([
                {
                    "code": "Nome",
                    "message": "Nome não informado."
                }
            ])
        });
    });
    test("It should be returned an error if name length its great then 25", async () => {
        const dataNewDenunciator = {
            "name": 'Teste Denunciator teste teste teste teste',
            "cpf": "12345678900"
        }
        const create = new Denunciators(dataNewDenunciator);
        return await create.validate().catch(res => {
            expect(res).toStrictEqual([
                {
                    "code": "Nome inválido",
                    "message": "Nome deve ter no máximo 25 letras."
                }
            ])
        });
    });
    test("It should be returned an error if cpf have a special characters", async () => {
        const dataNewDenunciator = {
            cpf: '115-475-985-00',
            name: 'teste name'
        }
        const create = new Denunciators(dataNewDenunciator);
        return await create.validate().catch(res => {
            expect(res).toStrictEqual([
                {
                    "code": "Cpf inválido",
                    "message": "Cpf não deve conter caractéres especiais."
                },
                {
                    "code": "Cpf inválido",
                    "message": "Cpf deve ter 11 digitos e não deve possuir barras pontos ou qualquer caracter especial."
                }
            ])
        });
    });
    test("It should be returned an error if cpf have a lenght != 11", async () => {
        const dataNewDenunciator = {
            cpf: '15447885210',
            name: 'teste name'
        }
        const create = new Denunciators(dataNewDenunciator);
        return await create.validate().catch(res => {
            expect(res).toStrictEqual([
                {
                    "code": "Cpf inválido",
                    "message": "Cpf deve ter 11 digitos e não deve possuir barras pontos ou qualquer caracter especial."
                }
            ])
        });
    });
});