import { createConnection } from "typeorm";
import { log } from "../utils/util";

export const connectServerOnDB = async (): Promise<void> => {
    try {
        const connection = await createConnection();
        console.log('connectado')
        process.on('SIGINT', () => {
            connection.close().then(() => console.log('DB connection closed'));
        })
    } catch (error) {
        log('error', `Error in db config: ${error.message}`)
        console.log(error)
        throw new Error(`Error in db config: ${error.message}`);
    }
}