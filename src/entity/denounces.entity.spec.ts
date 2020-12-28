import { Denounces } from "./Denounces.entity";
import { Denunciators } from "./Denunciators.entity";
import { createConnection } from "typeorm";
import { Addresses } from "./Addresses.entity";

describe.only("Test the Address Entity", () => {

    let connection = null;
    beforeAll(async () => {
        connection = await createConnection()
    });

    afterAll(async () => {
        connection.close()
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
        const create = await connection.getRepository(Denounces).save(dataDenounces);
        return expect(create).toStrictEqual(
            { 
                "address_id": saveTestAddress['id'], 
                "denunciator_id": saveTestDenunciator['id'], 
                "description": "Existe um esgoto a céu aberto nesta localidade.", 
                "created_at": create['created_at'],
                "updated_at": create['updated_at'],
                "id": create['id'],
                "title": "denunce test title"
            }
        )
    });
    test("It should be returned an error if denunciator_id not passed", async () => {
        const dataDenounces = {
            title: 'denunce test title',
            description: "Existe um esgoto a céu aberto nesta localidade.",
            denunciator_id: null,
            address_id: 12234
        }
        const create = new Denounces(dataDenounces);
        return await create.validate().catch(res => {
            expect(res).toStrictEqual([
                { 
                    "code": "Denunciante", 
                    "message": "Denunciante não informado."
                }
            ])
        });
    });
    test("It should be returned an error if address_id not passed", async () => {
        const dataDenounces = {
            title: 'denunce test title',
            description: "Existe um esgoto a céu aberto nesta localidade.",
            denunciator_id: 12234,
            address_id: null
        }
        const create = new Denounces(dataDenounces);
        return await create.validate().catch(res => {
            expect(res).toStrictEqual([
                { 
                    "code": "Endereço", 
                    "message": "Endereço não informado."
                }
            ])
        });
    });
});