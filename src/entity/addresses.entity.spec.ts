import { Addresses } from "./Addresses.entity";
import { createConnection } from "typeorm";

describe.only("Test the Address Entity", () => {

    let connection = null;
    beforeAll(async () => {
        connection = await createConnection()
    });

    afterAll(async () => {
        connection.close()
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
        const create = await connection.getRepository(Addresses).save(data);
        return expect(create).toStrictEqual(
            { 
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
        return await create.validate().catch(err => {
            expect(err).toStrictEqual([
                {
                    "code": "Estado",
                    "message": "Estado não informado.",
                },

            ]);
        })
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
        return await create.validate().catch(err => {
            expect(err).toStrictEqual([
                {
                    "code": "Cidade",
                    "message": "Cidade não informado.",
                },

            ]);
        })
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
        return await create.validate().catch(err => {
            expect(err).toStrictEqual([
                {
                    "code": "Pais",
                    "message": "Pais não informado.",
                },

            ]);
        })
    });
});