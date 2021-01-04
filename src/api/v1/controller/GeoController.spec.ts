import * as controller from "./GeoController";

describe("Test the GEO Controller", () => {
    const emptyGeo = { lat: 0, lng: 0 };

    test("It should response with not address detected to this local if API dont return a valid address", async () => {
        const geoData = {
            "latitude": -35.713458,
            "longitude": -35.713458,
        }
        try {
            await new controller.GeoController({ lat: geoData.latitude, lng: geoData.longitude }).getAddress();
        } catch (error) {
            expect(error).toStrictEqual(new Error(JSON.stringify("Endereço não encontrado para essa localidade.")));
        }
    });
    test("It should response with a address object if API return a valid address", async () => {
        const geoData = {
            "latitude": -9.648198,
            "longitude": -35.713458,
        }
        try {
            const res = await new controller.GeoController({ lat: geoData.latitude, lng: geoData.longitude }).getAddress();
            expect(res).toEqual(
                expect.objectContaining({
                    "city": "Maceió",
                    "country": "BR",
                    "lat": -9.648198,
                    "lng": -35.713458,
                    "neightborhood": "",
                    "postal_code": "57036-371",
                    "state": "Alagoas",
                    "street": "Avenida Dona Constança de Góes Monteiro"
                })
            )
        } catch (error) {
            return;
        }
    });
    test("It should response with false if country not found", async () => {
        const address = {
            lat: 1233444,
            lng: 34335534,
            country: null,
            state: 'state test',
            city: 'city teste',
            neightborhood: 'neighboorhod test',
            street: 'street test',
            postal_code: '2343-234',
            json: {}
        };
        const Geo = new controller.GeoController(emptyGeo).isValidAddress(address);
        return expect(Geo).toBe(false);
    });
    test("It should response with false if state was not found", async () => {
        const address = {
            lat: 1233444,
            lng: 34335534,
            country: 'Country test',
            state: null,
            city: 'city teste',
            neightborhood: 'neighboorhod test',
            street: 'street test',
            postal_code: '2343-234',
            json: {}
        };
        const Geo = new controller.GeoController(emptyGeo).isValidAddress(address);
        return expect(Geo).toBe(false);
    });
    test("It should response with false if city not found", async () => {
        const address = {
            lat: 1233444,
            lng: 34335534,
            country: 'Country test',
            state: 'state test',
            city: null,
            neightborhood: 'neighboorhod test',
            street: 'street test',
            postal_code: '2343-234',
            json: {}
        };
        const Geo = new controller.GeoController(emptyGeo).isValidAddress(address);
        return expect(Geo).toBe(false);
    });
    test("It should response with true if the address object its a valid address", async () => {
        const address = {
            lat: 1233444,
            lng: 34335534,
            country: 'Country test',
            state: 'state test',
            city: 'City Test',
            neightborhood: 'neighboorhod test',
            street: 'street test',
            postal_code: '2343-234',
            json: {}
        };
        const Geo = new controller.GeoController(emptyGeo).isValidAddress(address);
        expect(Geo).toBe(true);
    });
});