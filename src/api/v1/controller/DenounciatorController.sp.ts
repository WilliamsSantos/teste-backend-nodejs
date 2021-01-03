import { createConnection, getConnection } from "typeorm";
import controller = require("./DenunciatorController");
import * as config from "../../../config/DbTestConfig";

describe("Test the Denunciator Controller", () => {
    beforeEach(() => {
        return createConnection(config.dbTestConfig);
    });
    afterEach(() => {
        const conn = getConnection();
        return conn.close();
    });

    test("should be returned an Denunciator object created", async () => {
        const dataNewDenunciator = {
            name: 'Teste Denunciator',
            cpf: '11112312315'
        }
        await getConnection().transaction(async EntityManager => {
            const create = await new controller.DenunciatorController(dataNewDenunciator).store(EntityManager);
            return expect(create).toEqual({
                "cpf": "11112312315",
                "created_at": create['created_at'],
                "getTableName": expect.any(Function),
                "id": create['id'],
                "name": "Teste Denunciator",
                "setTableName": expect.any(Function),
                "tableName": "Denunciators",
                "updated_at": create['updated_at']
            })
        })
    });
    test("should be send a fail response if some data is wrong passed", async () => {
        const dataNewDenunciator = {
            name: 'Teste Denunciator',
            cpf: null
        }
        await getConnection().transaction(async EntityManager => {
            try {
                await new controller.DenunciatorController(dataNewDenunciator).store(EntityManager);
            } catch (error) {
                expect(error).toStrictEqual(new Error(JSON.stringify([{"code":"cpf","message":"cpf não informado."},{"code":"cpf","message":"cpf deve conter apenas digitos."}])));
            }
        })
    });
})
