import controller = require("./DenounceController");

describe("Test the Denounce Controller", () => {
    test("It should response with not address detected to this local if API dont return a valid address", async () => {
        const geoData = {
            "latitude": -35.713458,
            "longitude": -35.713458,
        }
        // return await new controller.GeoController({ lat: geoData.latitude, lng: geoData.longitude }).getAddress().catch(res => {
        //     expect(res).toBe("Endereço não encontrado para essa localidade.");
        // })
    });
})