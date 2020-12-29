
const configDBTest = {
   "type": process.env.DB_CONNECTION_TEST,
   "database": process.env.DB_TEST,
   "synchronize": true,
   "logging": false,
}
const configDB = {
   "type": process.env.DB_CONNECTION,
   "host": process.env.DB_HOST,
   "port": process.env.DB_PORT,
   "username": process.env.DB_USERNAME,
   "password": process.env.DB_PASSWORD,
   "database": process.env.DB,
   "synchronize": process.env.TYPEORM_SYNCHRONIZE,
   "logging": process.env.TYPEORM_LOGGING,
}

process.env.NODE_ENV === 'test' ? db = configDBTest : db = configDB;

module.exports = {
   ...db,
   "entities": [
      "src/entity/**/*.entity.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
