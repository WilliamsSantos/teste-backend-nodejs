import { createConnection, getConnection } from "typeorm";
import controller = require("./AddressController");
import * as config from "../../../config/DbTestConfig";

describe("Test the Address Controller", () => {
    beforeEach(() => {
        return createConnection(config.dbTestConfig);
    });
    afterEach(() => {
        const conn = getConnection();
        return conn.close();
    });

    test("It should response with new object Address created", async () => {
        const data = {
            lat: -9.648198,
            lng: -35.713458,
            country: 'BR',
            state: 'Alagoas',
            city: 'Maceió',
            neightborhood: '',
            street: 'Avenida Dona Constança de Góes Monteiro',
            postal_code: '57036-371'
        }
        await getConnection().transaction(async EntityManager => {
            const create = await new controller.AddressController(data).store(EntityManager);
            return expect(create).toEqual(
                {
                    "getTableName": expect.any(Function),
                    "setTableName": expect.any(Function),
                    "tableName": "Addresses",
                    "city": "Maceió",
                    "country": "BR",
                    "created_at": create['created_at'],
                    "id": create['id'],
                    "lat": -9.648198,
                    "lng": -35.713458,
                    "neightborhood": "",
                    "postal_code": "57036-371",
                    "state": "Alagoas",
                    "street": "Avenida Dona Constança de Góes Monteiro",
                    "updated_at": create['updated_at']
                }
            )
        })
    });
    test("It should be send a fail response if some data is wrong passed", async () => {
        const data = {
            lat: null,
            lng: null,
            country: 'BR',
            state: null,
            city: null,
            neightborhood: '',
            street: 'Avenida Dona Constança de Góes Monteiro',
            postal_code: '57036-371'
        }
        await getConnection().transaction(async EntityManager => {
            try {
                await new controller.AddressController(data).store(EntityManager);
            } catch (error) {
                expect(error).toStrictEqual(new Error(JSON.stringify([{ "code": "Cidade", "message": "Cidade não informado." }, { "code": "Estado", "message": "Estado não informado." }])));
            }
        })
    });
});