import { Addresses } from "./Addresses.entity";
import { createConnection } from "typeorm";

describe("Test the Address Entity", () => {

    let connection = null;
    beforeAll(async ()=>{
        connection = await createConnection()
    });

    afterAll(async ()=>{
        connection.close()
    });

    // test("It should response with new object Address created", async () => {
    //     const data = {
    //         lat: -9.648198,
    //         lng: -35.713458,
    //         country: 'BR',
    //         state: 'Alagoas',
    //         city: 'Maceió',
    //         neightborhood: '',
    //         street: 'Avenida Dona Constança de Góes Monteiro',
    //         postal_code: '57036-371'
    //     }
    //     const create = await connection.getRepository(Addresses);
    //     expect(await create.save(data)).toStrictEqual({
    //         setTableName: '[Function (anonymous)]',
    //         getTableName: '[Function (anonymous)]',
    //         city: 'Maceió',
    //         country: 'BR',
    //         lat: -9.648198,
    //         lng: -35.713458,
    //         neightborhood: '',
    //         postal_code: '57036-371',
    //         state: 'Alagoas',
    //         street: 'Avenida Dona Constança de Góes Monteiro',
    //         tableName: 'Addresses',
    //         id: 134,
    //         created_at: '2020-12-28T10:39:41.156Z',
    //         updated_at: '2020-12-28T10:39:41.156Z'
    //     })
    // });
    test("It should validate a wrong data address", async () => {
        const data = {
            lat: -9.648198,
            lng: -35.713458,
            country: 'BR',
            // state: 'Alagoas',
            city: 'Maceió',
            neightborhood: '',
            street: 'Avenida Dona Constança de Góes Monteiro',
            postal_code: '57036-371'
        }
        const create = new Addresses(data);
        expect(await create.validate()).toStrictEqual({
            "code": "Estado",
            "message": "Estado não informado.",
        });
    });
    test("It should validate a wrong data address", async () => {
        const data = {
            lat: -9.648198,
            lng: -35.713458,
            country: 'BR',
            // state: 'Alagoas',
            city: 'Maceió',
            neightborhood: '',
            street: 'Avenida Dona Constança de Góes Monteiro',
            postal_code: '57036-371'
        }
        const create = new Addresses(data);
        expect(await create.validate()).toStrictEqual({
            "code": "Estado",
            "message": "Estado não informado.",
        });
    });
});