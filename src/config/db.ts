import { createConnection } from "typeorm";

export const connectServerOnDB = async (): Promise<void> => {
    const connection = await createConnection();
    console.log('App conected on ', connection.options.database)

    process.on('SIGINT', () => {
        connection.close().then(() => console.log('DB connection closed'));
    })
}