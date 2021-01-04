import { createConnection, getConnection } from "typeorm";
import { Denounces } from "./Denounces.entity";
import * as config from "../config/DbTestConfig";

describe("Test the Address Entity", () => {
    beforeEach(() => {
        return createConnection(config.dbTestConfig);
    });
    afterEach(() => {
        const conn = getConnection();
        return conn.close();
    });

    test("It should be returned an error if denunciator_id not passed", async () => {
        const dataDenounces = {
            title: 'denunce test title',
            description: "Existe um esgoto a céu aberto nesta localidade.",
            denunciator_id: null,
            address_id: 12234
        }
        const create = new Denounces(dataDenounces);
        try {
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Denunciante",
                        "message": "Denunciante não informado."
                    }
                ])
            ));
        }
    });
    test("It should be returned an error if address_id not passed", async () => {
        const dataDenounces = {
            title: 'denunce test title',
            description: "Existe um esgoto a céu aberto nesta localidade.",
            denunciator_id: 12234,
            address_id: null
        }
        const create = new Denounces(dataDenounces);
        try {
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Endereço",
                        "message": "Endereço não informado."
                    }
                ])
            ));
        }
    });
    test("It should be returned an error if title less then 10 length", async () => {
        const dataDenounces = {
            title: 'denunce',
            description: "Existe um esgoto a céu aberto nesta localidade.",
            denunciator_id: 12234,
            address_id: 23455
        }
        try {
            const create = new Denounces(dataDenounces);
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Titulo",
                        "message": "Titulo deve ter no minimo 10 letras."
                    }
                ])
            ));
        }
    });
    test("It should be returned an error if title great then 35 length", async () => {
        const dataDenounces = {
            title: 'denunce teste teste teste teste teste',
            description: "Existe um esgoto a céu aberto nesta localidade.",
            denunciator_id: 12234,
            address_id: 23455
        }
        try {
            const create = new Denounces(dataDenounces);
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Titulo",
                        "message": "Titulo deve ter no máximo 35 letras."
                    }
                ])
            ));
        }
    });
    test("It should be returned an error if description not passed", async () => {
        const dataDenounces = {
            title: 'denunce teste teste',
            description: null,
            denunciator_id: 12234,
            address_id: 23455
        }
        try {
            const create = new Denounces(dataDenounces);
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Descricao",
                        "message": "Descricao não informado."
                    }
                ])
            ));
        }
    });
    test("It should be returned an error if description less then 35", async () => {
        const dataDenounces = {
            title: 'denunce teste teste',
            description: "Existe",
            denunciator_id: 12234,
            address_id: 23455
        }
        try {
            const create = new Denounces(dataDenounces);
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Descricao",
                        "message": "Descricao deve ter no minimo 35 letras."
                    }
                ])
            ));
        }
    });
    test("It should be returned an error if description great then 355", async () => {
        const dataDenounces = {
            title: 'denunce teste teste',
            description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
            denunciator_id: 12234,
            address_id: 23455
        }
        try {
            const create = new Denounces(dataDenounces);
            await create.validate();
        } catch (error) {
            expect(error).toStrictEqual(new Error(
                JSON.stringify([
                    {
                        "code": "Descricao",
                        "message": "Descricao deve ter no máximo 355 letras."
                    }
                ])
            ));
        }
    });
});