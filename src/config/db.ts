import { createConnection } from "typeorm";
import { log } from "../utils/util";

export const connectServerOnDB = async (): Promise<void> => {
    try {
        const connection = await createConnection();
        
        process.on('SIGINT', () => {
            connection.close().then(() => console.log('DB connection closed'));
        })
    } catch (error) {
        console.log(error)
        log('error', `Error in db config: ${error.message}`)
        throw new Error(`Error in db config: ${error.message}`);
    }
}