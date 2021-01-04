import { createConnection, getConnection } from "typeorm";
import * as controller from "./index";
import * as config from "../../../config/DbTestConfig";
import { Addresses, Denunciators } from "../../../entity";

describe("Test the Denounce Controller", () => {
    beforeEach(() => {
        return createConnection(config.dbTestConfig);
    });
    afterEach(() => {
        const conn = getConnection();
        return conn.close();
    });

    test("It should be returned an Denouncies object created", async () => {
        await getConnection().transaction(async EntityManager => {
            const newAddress = new Addresses({
                lat: -9.648198,
                lng: -35.713458,
                country: "BR",
                state: "Alagoas",
                city: "Maceió",
                neightborhood: "",
                street: "Avenida Dona Constança de Góes Monteiro",
                postal_code: "57036-371"
            });
            const newDenunciator = new Denunciators({
                name: "Teste Denunciator",
                cpf: "11112312315"
            });

            const saveTestAddress = await new controller.AddressController(newAddress).store(EntityManager);
            const saveTestDenunciator = await new controller.DenunciatorController(newDenunciator).store(EntityManager);

            const dataDenounces = {
                title: "denunce test title",
                description: "Existe um esgoto a céu aberto nesta localidade.",
                denunciator_id: saveTestDenunciator["id"],
                address_id: saveTestAddress["id"]
            }
            const create = await new controller.DenounceController(dataDenounces).store(EntityManager);
            return expect(create).toEqual(
                {
                    "getTableName": expect.any(Function),
                    "setTableName": expect.any(Function),
                    "tableName": "Denounces",
                    "address_id": saveTestAddress["id"],
                    "denunciator_id": saveTestDenunciator["id"],
                    "description": "Existe um esgoto a céu aberto nesta localidade.",
                    "created_at": create["created_at"],
                    "updated_at": create["updated_at"],
                    "id": create["id"],
                    "title": "denunce test title"
                }
            )
        })
    });
    test("It should be send a fail response if some data is wrong passed", async () => {
        const dataDenounces = {
            title: "denunce test title",
            description: "Existe um esgoto a céu aberto nesta localidade.",
            denunciator_id: null,
            address_id: 4344545
        }
        await getConnection().transaction(async EntityManager => {
            try {
                await new controller.DenounceController(dataDenounces).store(EntityManager);
            } catch (error) {
                expect(error).toStrictEqual(new Error(JSON.stringify([{ "code": "Denunciante", "message": "Denunciante não informado." }])));
            }
        })
    });
})