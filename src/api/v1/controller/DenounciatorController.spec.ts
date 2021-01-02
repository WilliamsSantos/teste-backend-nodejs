import { createConnection, getConnection } from "typeorm";
import { denounciator } from "../../../entity/Interface";
import controller = require("./DenunciatorController");

describe("Test the Denunciator Controller", () => {
    let connection = null;
    beforeAll(async () => {
        connection = await createConnection()
    });

    afterAll(async () => {
        connection.close()
    });

    test("It should be returned an Denounciator object created", async () => {
        const dataNewDenunciator = {
            name: 'Teste Denunciator',
            cpf: '11112312315'
        }
        await getConnection().transaction(async EntityManager => {
            const create = await new controller.DenounciatorController(dataNewDenunciator).save(EntityManager);
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
    test("It should be send a fail response if some data is wrong passed", async () => {
        const dataNewDenunciator = {
            name: 'Teste Denunciator',
            cpf: null
        }
        await getConnection().transaction(async EntityManager => {
            const create = await new controller.DenounciatorController(dataNewDenunciator).save(EntityManager).catch(err => {
                return expect(err).toEqual([
                    {
                        "code": "Cpf",
                        "message": "Cpf não informado.",
                    },
                ])
            });
        })
    });
})