import { ErrorCodes } from "./ErrorCodes.entity";
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
        const create = await connection.getRepository(ErrorCodes).save(data);
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
});