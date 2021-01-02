import cache = require("./Redis");

describe("Test the Redis Cache", () => {
    test("It should save a new Address to Cached", async () => {
        const geoData = { "latitude": 3459, "longitude": -35.713458 }
        const address = {'teste':'teste'}
        await new cache.RedisCache().saveAddresInCache({
            lat: geoData.latitude,
            lng: geoData.longitude
        }, address)
        expect(await new cache.RedisCache()
            .getAddress({ lat: geoData.latitude, lng: geoData.longitude })).toStrictEqual(address)
    })
    test("It should response with the new Address Cached", async () => {
        const geoData = { "latitude": 3459, "longitude": -35.713458 }
        const addressNewCachedTest = {}
        new cache.RedisCache().saveAddresInCache({
            lat: geoData.latitude,
            lng: geoData.longitude
        }, addressNewCachedTest)

        const addressCached = await new cache.RedisCache()
            .getAddress({ lat: geoData.latitude, lng: geoData.longitude })

        expect(addressCached).toStrictEqual(addressNewCachedTest)
    })
})