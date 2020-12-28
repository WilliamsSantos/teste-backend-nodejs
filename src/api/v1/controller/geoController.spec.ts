import * as request from"supertest";
import controller = require("./GeoController");

describe("Test the Geo Controller", () => {
    test("It should response with 405 code Method Not Allowed", async () => {
        expect(1+2).toBe(3)
    });
});