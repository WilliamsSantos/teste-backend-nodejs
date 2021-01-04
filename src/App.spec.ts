import * as request from "supertest";
import { createConnection, getConnection } from "typeorm";
import server = require("./App");
import * as config from "./config/DbTestConfig";

beforeEach(() => {
    return createConnection(config.dbTestConfig);
});
afterEach(() => {
    const conn = getConnection();
    return conn.close();
});
describe("Test the router not implement", () => {
    test("should response with 405 code Method Not Allowed", async () => {
        return await request(server.app)
            .get("/v1/denunciar")
            .expect('Content-Type', /json/)
            .expect(405)
            .then(response => {
                expect(response.body).toEqual("Router Not Implement");
            });
    });
    test("should response router not Implements message", async () => {
        return await request(server.app)
            .post("/v1/denunciar")
            .expect('Content-Type', /json/)
            .expect(405)
            .then(response => {
                expect(response.body).toEqual("Router Not Implement");
            });
    });
});

describe("Test the router request middleware", () => {
    test("should response with empty request message and status 400, if not have body send", async () => {
        return await request(server.app)
            .post("/v1/denuncias")
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toStrictEqual({
                    "code": 0,
                    "message": "Requisição vazia.",
                });
            });
    });
    test("should reply with the missing field denunciante in the request", async () => {
        const bodyRequest = {
            "latitude": -9.5481839,
            "longitude": 340,
            "denuncia": {
                "titulo": "agora agora",
                "descricao": "Aqui vai um post com errosaasasasass"
            }
        }
        return await request(server.app)
            .post("/v1/denuncias")
            .send(bodyRequest)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toStrictEqual({
                    "code": 0,
                    "message": "Requisição inválida, denunciante não encontrado.",
                });
            });
    });
    test("should reply with the missing field denunciante > nome in the request", async () => {
        const bodyRequest = {
            "latitude": -9.5481839,
            "longitude": 340,
            "denunciante": {
                "cpf": "11548242011"
            },
            "denuncia": {
                "titulo": "agora agora",
                "descricao": "Aqui vai um post com errosaasasasass"
            }
        }
        return await request(server.app)
            .post("/v1/denuncias")
            .send(bodyRequest)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toStrictEqual({
                    "errors": [
                        {
                            "code": "denunciante > nome",
                            "message": "Campo denunciante > nome requerido",
                        }
                    ]
                });
            });
    });
    test("should reply with the missing field denunciante > cpf in the request", async () => {
        const bodyRequest = {
            "latitude": -9.5481839,
            "longitude": 340,
            "denunciante": {
                "nome": "Nome teste"
            },
            "denuncia": {
                "titulo": "agora agora",
                "descricao": "Aqui vai um post com errosaasasasass"
            }
        }
        return await request(server.app)
            .post("/v1/denuncias")
            .send(bodyRequest)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toStrictEqual({
                    "errors": [
                        {
                            "code": "denunciante > cpf",
                            "message": "Campo denunciante > cpf requerido",
                        }
                    ]
                });
            });
    });
    test("should reply with the missing field latitude in the request", async () => {
        const bodyRequest = {
            "longitude": 340,
            "denunciante": {
                "nome": "Wweee",
                "cpf": "11548242011"
            },
            "denuncia": {
                "titulo": "agora agora",
                "descricao": "Aqui vai um post com errosaasasasass"
            }
        }
        return await request(server.app)
            .post("/v1/denuncias")
            .send(bodyRequest)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toStrictEqual({
                    "code": 0,
                    "message": "Requisição inválida, latitude não encontrado.",
                });
            });
    });
    test("should reply with the missing field longitude in the request", async () => {
        const bodyRequest = {
            "latitude": -9.5481839,
            "denunciante": {
                "nome": "Wweee",
                "cpf": "11548242011"
            },
            "denuncia": {
                "titulo": "agora agora",
                "descricao": "Aqui vai um post com errosaasasasass"
            }
        }
        return await request(server.app)
            .post("/v1/denuncias")
            .send(bodyRequest)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toStrictEqual({
                    "code": 0,
                    "message": "Requisição inválida, longitude não encontrado.",
                });
            });
    });
    test("should reply with the missing field denuncia in the request", async () => {
        const bodyRequest = {
            "latitude": -9.5481839,
            "longitude": 340,
            "denunciante": {
                "nome": "Wweee",
                "cpf": "11548242011"
            }
        }
        return await request(server.app)
            .post("/v1/denuncias")
            .send(bodyRequest)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toStrictEqual({
                    "code": 0,
                    "message": "Requisição inválida, denuncia não encontrado."
                });
            });
    });
    test("should reply with the missing field denuncia > titulo in the request", async () => {
        const bodyRequest = {
            "latitude": -9.5481839,
            "longitude": 340,
            "denunciante": {
                "nome": "Wweee",
                "cpf": "11548242011"
            },
            "denuncia": {
                "descricao": "Aqui vai um post com errosaasasasass"
            }
        }
        return await request(server.app)
            .post("/v1/denuncias")
            .send(bodyRequest)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toStrictEqual({
                    "errors": [
                        {
                            "code": "denuncia > titulo",
                            "message": "Campo denuncia > titulo requerido",
                        }
                    ]
                });
            });
    });
    test("should reply with the missing field denuncia > descricao in the request", async () => {
        const bodyRequest = {
            "latitude": -9.5481839,
            "longitude": 340,
            "denunciante": {
                "nome": "Wweee",
                "cpf": "11548242011"
            },
            "denuncia": {
                "titulo": "Titulo de teste aqui",
            }
        }
        return await request(server.app)
            .post("/v1/denuncias")
            .send(bodyRequest)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toStrictEqual({
                    "errors": [
                        {
                            "code": "denuncia > descricao",
                            "message": "Campo denuncia > descricao requerido",
                        }
                    ]
                });
            });
    });
});

describe("Test the request fields validates", () => {    
    test("should return a errors message to field cpf with length != 11 with a error message", async () => {
        const bodyRequest = {
            "latitude": -9.648198,
            "longitude": -35.713458,
            "denunciante": {
                "nome": "williams teste1",
                "cpf": "1154824"
            },
            "denuncia": {
                "titulo": "agora agora",
                "descricao": "Aqui vai um post com errosaasasasass"
            }
        };
        await request(server.app)
            .post("/v1/denuncias")
            .send(bodyRequest)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toStrictEqual({
                    "errors": [
                        {
                            "code": "cpf", 
                            "message": "cpf deve ter no minimo 11 digitos."
                        }
                    ]
                });
            });
    });
    test("should return a errors array with message cpf must have a maximum of 11 letters and cpf must contain only digits", async () => {
        const bodyRequest = {
            "latitude": -9.648198,
            "longitude": -35.713458,
            "denunciante": {
                "nome": "williams teste1",
                "cpf": "115.482.704-66"
            },
            "denuncia": {
                "titulo": "agora agora",
                "descricao": "Aqui vai um post com errosaasasasass"
            }
        };
        return await request(server.app)
            .post("/v1/denuncias")
            .send(bodyRequest)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toStrictEqual({
                    "errors": [
                        {
                            "code": "cpf", 
                            "message": "cpf deve conter apenas digitos."
                        }, 
                        {
                            "code": "cpf", 
                            "message": "cpf deve ter no máximo 11 digitos."
                        }
                    ]
                });
            });
    });
})

describe("Test the sucessfull registre a denounce", () => {
    test("should response with 201 create status and denounce on object response", async () => {
        const bodyRequest = {
            "latitude": -9.648198,
            "longitude": -35.713458,
            "denunciante": {
                "nome": "williams teste1",
                "cpf": "12345678901"
            },
            "denuncia": {
                "titulo": "agora agora",
                "descricao": "Aqui vai um post com errosaasasasass"
            }
        }
        return await request(server.app)
            .post("/v1/denuncias")
            .send(bodyRequest)
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                response.body.id = 1;
                expect(response.body).toStrictEqual(
                    {
                        "endereco": {
                            "logradouro": "Avenida Dona Constança de Góes Monteiro",
                            "bairro": "",
                            "cidade": "Maceió",
                            "estado": "Alagoas",
                            "pais": "BR",
                            "codigo_postal": "57036-371",
                        },
                        "denuncia": {
                            "descricao": "Aqui vai um post com errosaasasasass",
                            "titulo": "agora agora",
                        },
                        "denunciante": {
                            "cpf": "12345678901",
                            "nome": "williams teste1",
                        },
                        "id": 1,
                        "latitude": -9.648198,
                        "longitude": -35.713458
                    }
                );
            });
    });
})