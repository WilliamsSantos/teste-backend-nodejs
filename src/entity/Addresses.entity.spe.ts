import { createConnection, getConnection } from "typeorm";
import { Addresses } from "./Addresses.entity";
import * as config from "../config/DbTestConfig";

describe("Test the Address Entity", () => {
    beforeEach(() => {
        return createConnection(config.dbTestConfig);
    });
    afterEach(() => {
        const conn = getConnection();
        return conn.close();
    });

    test("It should be returned an error message referring to the state field not passed", async () => {
        const data = {
            lat: -9.648198,
            lng: -35.713458,
            country: 'BR',
            state: null,
            city: 'Maceió',
            neightborhood: '',
            street: 'Avenida Dona Constança de Góes Monteiro',
            postal_code: '57036-371'
        }
        const create = new Addresses(data);
        try {
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Estado",
                        "message": "Estado não informado."
                    }
                ])
            ));
        }
    });
    test("It should be returned an error message referring to the city field not passed", async () => {
        const data = {
            lat: -9.648198,
            lng: -35.713458,
            country: 'BR',
            state: 'Alagoas',
            city: null,
            neightborhood: '',
            street: 'Avenida Dona Constança de Góes Monteiro',
            postal_code: '57036-371'
        }
        const create = new Addresses(data);
        try {
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Cidade",
                        "message": "Cidade não informado."
                    }
                ])
            ));
        }
    });
    test("It should be returned an error message referring to the country field not passed", async () => {
        const data = {
            lat: -9.648198,
            lng: -35.713458,
            country: null,
            state: 'Alagoas',
            city: 'Maceió',
            neightborhood: '',
            street: 'Avenida Dona Constança de Góes Monteiro',
            postal_code: '57036-371'
        }
        const create = new Addresses(data);
        try {
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Pais",
                        "message": "Pais não informado."
                    }
                ])
            ));
        }
    });
});