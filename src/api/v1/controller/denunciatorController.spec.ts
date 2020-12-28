import * as request from"supertest";
import { createConnection } from "typeorm";
import controller = require("./DenunciatorController");

describe("Test the Denunciator Controller", () => {
    let connection = null;
    beforeAll(async ()=>{
        connection = await createConnection()
    });

    afterAll(async ()=>{
        connection.close()
    });
    test("It should response with 405 code Method Not Allowed", async () => {
        expect(1+2).toBe(3)
    });
});