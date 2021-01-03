import cache = require("./Redis");

describe("Test the Redis Cache", () => {
    test("should save and response with new address cached", async () => {
        const geoData: {latitude:number, longitude: number} = { latitude: 3459, longitude: -35.713458 }
        const address = {
            lat: 0,
            lng: 0,
            country: '',
            state: '',
            city: '',
            neightborhood: '',
            street: '',
            postal_code: '',
            json: {}
        }
        await new cache.RedisCache().saveAddresInCache(`${geoData.latitude},${geoData.longitude}`, address);
        expect(await new cache.RedisCache()
            .getAddress({ lat: geoData.latitude, lng: geoData.longitude })).toStrictEqual(address);
    })
})