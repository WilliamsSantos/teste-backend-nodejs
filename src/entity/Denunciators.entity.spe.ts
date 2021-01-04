import { createConnection, getConnection } from "typeorm";
import { Denunciators } from "./Denunciators.entity";
import * as config from "../config/DbTestConfig";

describe("Test the Denounciator Entity", () => {
    beforeEach(() => {
        return createConnection(config.dbTestConfig);
    });
    afterEach(() => {
        const conn = getConnection();
        return conn.close();
    });

    test("It should be returned an error if cpf not passed", async () => {
        const dataNewDenunciator = {
            name: 'Teste Denunciator',
            cpf: null
        }
        const create = new Denunciators(dataNewDenunciator);
        try {
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Cpf",
                        "message": "Cpf não informado."
                    }
                ])
            ));
        }
    });
    test("It should be returned an error if name not passed", async () => {
        const dataNewDenunciator = {
            "cpf": "12345678900",
            "name": null
        }
        const create = new Denunciators(dataNewDenunciator);
        try {
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Nome",
                        "message": "Nome não informado."
                    }
                ])
            ));
        }
    });
    test("It should be returned an error if name length its great then 25", async () => {
        const dataNewDenunciator = {
            "name": 'Teste Denunciator teste teste teste teste',
            "cpf": "12345678900"
        }
        const create = new Denunciators(dataNewDenunciator);
        try {
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Nome",
                        "message": "Nome deve ter no máximo 25 letras."
                    }
                ])
            ));
        }
    });
    test("It should be returned an error if cpf have a special characters", async () => {
        const dataNewDenunciator = {
            cpf: '115-475-985-00',
            name: 'teste name'
        }
        const create = new Denunciators(dataNewDenunciator);
        try {
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Cpf",
                        "message": "Cpf não deve conter caractéres especiais."
                    },
                    {
                        "code": "Cpf",
                        "message": "Cpf deve ter no máximo 11 digitos."
                    }
                ])
            ));
        }
    });
    test("It should be returned true if cpf have accept value", async () => {
        const dataNewDenunciator = {
            cpf: '15447885210',
            name: 'teste name'
        }
        const create = new Denunciators(dataNewDenunciator);
        try {
            const validate = await create.validate();
            expect(validate).toBeTruthy()
        } catch (error) {
           return;
        }
    });
});