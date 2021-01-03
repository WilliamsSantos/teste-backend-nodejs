import { Connection, createConnection, getConnection } from "typeorm";
import { Addresses } from "../../../entity/Addresses.entity";
import { Denunciators } from "../../../entity/Denunciators.entity";
import controller = require("./DenounceController");
import * as config from "../../../config/DbTestConfig";

describe("Test the Denounce Controller", () => {
    let connection: Connection;
    beforeEach(() => {
        createConnection(config.dbTestConfig);
        connection = getConnection();
    });
    afterEach(() => {
        return connection.close();
    });

    test("It should be returned an Denounces object created", async () => {
        const dataNewAddress = {
            lat: -9.648198,
            lng: -35.713458,
            country: 'BR',
            state: 'Alagoas',
            city: 'Maceió',
            neightborhood: '',
            street: 'Avenida Dona Constança de Góes Monteiro',
            postal_code: '57036-371'
        }
        const dataNewDenunciator = {
            name: 'Teste Denunciator',
            cpf: '11112312315'
        }

        const saveTestAddress = await connection.getRepository(Addresses).save(dataNewAddress);
        const saveTestDenunciator = await connection.getRepository(Denunciators).save(dataNewDenunciator);

        const dataDenounces = {
            title: 'denunce test title',
            description: "Existe um esgoto a céu aberto nesta localidade.",
            denunciator_id: saveTestDenunciator['id'],
            address_id: saveTestAddress['id']
        }
        await getConnection().transaction(async EntityManager => {
            const create = await new controller.DenounceController(dataDenounces).store(EntityManager);
            return expect(create).toEqual(
                {
                    "getTableName": expect.any(Function),
                    "setTableName": expect.any(Function),
                    "tableName": "Denounces",
                    "address_id": saveTestAddress['id'],
                    "denunciator_id": saveTestDenunciator['id'],
                    "description": "Existe um esgoto a céu aberto nesta localidade.",
                    "created_at": create['created_at'],
                    "updated_at": create['updated_at'],
                    "id": create['id'],
                    "title": "denunce test title"
                }
            )
        })
    });
    test("It should be send a fail response if some data is wrong passed", async () => {
        const dataDenounces = {
            title: 'denunce test title',
            description: "Existe um esgoto a céu aberto nesta localidade.",
            denunciator_id: null,
            address_id: 4344545
        }
        await getConnection().transaction(async EntityManager => {
            await new controller.DenounceController(dataDenounces).store(EntityManager).catch(err => {
                return expect(err).toEqual([{ "code": "Denunciante", "message": "Denunciante não informado." }])
            });
        })
    });
})