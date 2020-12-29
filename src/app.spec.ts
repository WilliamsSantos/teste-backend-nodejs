import * as request from "supertest";
import server = require("./app");

describe("Test the router not implement", () => {
    test("It should response with 405 code Method Not Allowed", async () => {
        return await request(server.app)
            .get("/v1/denunciar")
            .then(response => {
                expect(response.status).toBe(405);
                expect(response.body).toEqual("Router Not Implement");
            });
    });
    test("It should response router not Implements message", async () => {
        return await request(server.app)
            .post("/v1/denunciar")
            .then(response => {
                expect(response.body).toEqual("Router Not Implement");
                expect(response.status).toBe(405);
            });
    });
});

describe("Test the router request middleware", () => {
    test("It should response with empty request message and status 400, if not have body send", async () => {
        return await request(server.app)
            .post("/v1/denuncias")
            .then(response => {
                expect(response.status).toBe(400);
                expect(response.body).toStrictEqual({
                    "code": 0,
                    "message": "Requisição vazia.",
                });
            });
    });
    test("It should reply with the missing field denunciante in the request", async () => {
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
            .then(response => {
                expect(response.status).toBe(400);
                expect(response.body).toStrictEqual({
                    "code": 0,
                    "message": "Requisição invalida, denunciante não encontrado.",
                });
            });
    });
    test("It should reply with the missing field latitude in the request", async () => {
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
            .then(response => {
                expect(response.status).toBe(400);
                expect(response.body).toStrictEqual({
                    "code": 0,
                    "message": "Requisição invalida, latitude não encontrado.",
                });
            });
    });
    test("It should reply with the missing field longitude in the request", async () => {
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
                    "message": "Requisição invalida, longitude não encontrado.",
                });
            });
    });
    test("It should reply with the missing field denuncia in the request", async () => {
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
                    "message": "Requisição invalida, denuncia não encontrado."
                });
            });
    });
});

describe("Test the request fields validates", () => {
    test("It should return a errors message to field cpf with length != 11 with a error message", async () => {
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
        return await request(server.app)
            .post("/v1/denuncias")
            .send(bodyRequest)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toStrictEqual({ 
                    "errors": [
                        { 
                            "code": "Cpf inválido", 
                            "message": "Cpf deve ter 11 digitos e não deve possuir barras pontos ou qualquer caracter especial." 
                        }
                    ]
                })
            });
    });
    test("It should return a errors array with message and code to some error request", async () => {
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
            .expect(200)
            .then(response => {
                expect(response.body).toStrictEqual({
                    "errors": [
                        {
                            "code": "Cpf inválido", 
                            "message": "Cpf não deve conter caractéres especiais."
                        }, 
                        {
                            "code": "Cpf inválido", 
                            "message": "Cpf deve ter 11 digitos e não deve possuir barras pontos ou qualquer caracter especial."
                        }
                    ]}
                );
            });
    });
})

describe("Test the sucessfull registre a denounce", () => {
    test("It should response with 201 create status and denounce on object response", async () => {
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
                        "address":{
                            "city": "Maceió",
                            "country": "BR",
                            "lat": -9.648198,
                            "lng": -35.713458,
                            "neightborhood": "",
                            "postal_code": "57036-371",
                            "state": "Alagoas",
                            "street": "Avenida Dona Constança de Góes Monteiro",
                        },
                        "denounces": {
                            "description": "Aqui vai um post com errosaasasasass",
                            "title": "agora agora",
                        },
                       "denunciator": {
                            "cpf": "12345678901",
                            "name": "williams teste1",
                        },
                       "id": 1,
                       "latitude": -9.648198,
                       "longitude": -35.713458
                    }
                );
        });
    });
})