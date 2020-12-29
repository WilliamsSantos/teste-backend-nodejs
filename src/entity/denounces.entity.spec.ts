import { Denounces } from "./Denounces.entity";
import { Denunciators } from "./Denunciators.entity";
import { createConnection } from "typeorm";
import { Addresses } from "./Addresses.entity";
import { getConnection } from "typeorm";

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
    test("It should be returned an error if title less then 10 length", async () => {
        const dataDenounces = {
            title: 'denunce',
            description: "Existe um esgoto a céu aberto nesta localidade.",
            denunciator_id: 12234,
            address_id: 23455
        }
        const create = new Denounces(dataDenounces);
        return await create.validate().catch(res => {
            expect(res).toStrictEqual([
                {
                    "code": "Titulo", 
                    "message": "Titulo deve ter no minimo 10 letras."
                }
            ])
        });
    });
    test("It should be returned an error if title great then 35 length", async () => {
        const dataDenounces = {
            title: 'denunce teste teste teste teste teste',
            description: "Existe um esgoto a céu aberto nesta localidade.",
            denunciator_id: 12234,
            address_id: 23455
        }
        const create = new Denounces(dataDenounces);
        return await create.validate().catch(res => {
            expect(res).toStrictEqual([
                {
                    "code": "Titulo", 
                    "message": "Titulo deve ter no máximo 35 letras."
                }
            ])
        });
    });
    test("It should be returned an error if description not passed", async () => {
        const dataDenounces = {
            title: 'denunce teste teste',
            // description: "Existe um esgoto a céu aberto nesta localidade.",
            denunciator_id: 12234,
            address_id: 23455
        }
        const create = new Denounces(dataDenounces);
        return await create.validate().catch(res => {
            expect(res).toStrictEqual([
                {
                    "code": "Descrição",
                    "message": "Todas as denuncias precisam de 1 descrição.",
                }
            ])
        });
    });
    test("It should be returned an error if description less then 35", async () => {
        const dataDenounces = {
            title: 'denunce teste teste',
            description: "Existe",
            denunciator_id: 12234,
            address_id: 23455
        }
        const create = new Denounces(dataDenounces);
        return await create.validate().catch(res => {
            expect(res).toStrictEqual([
                {
                    "code": "Descrição",
                    "message": "Descrição deve ter no minimo 35 letras.",
                }
            ])
        });
    });
    test("It should be returned an error if description great then 355", async () => {
        const dataDenounces = {
            title: 'denunce teste teste',
            description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
            denunciator_id: 12234,
            address_id: 23455
        }
        const create = new Denounces(dataDenounces);
        return await create.validate().catch(res => {
            expect(res).toStrictEqual([
                {
                    "code": "Descrição Muito Grande",
                    "message": "Descrição deve ter no máximo 355 letras."
                }
            ])
        });
    });
});