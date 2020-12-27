import { createConnection } from "typeorm";
import { log } from "../utils/util";

export const connectServerOnDB = async (): Promise<void> => {
    try {
        const connection = await createConnection();
        console.log('===========================')
        console.log('>> DB connection > OK ')
        console.log('===========================')
        process.on('SIGINT', () => {
            connection.close().then(() => console.log('DB connection closed'));
        })
    } catch (error) {
        console.log('===========================')
        console.log('>> DB connection > FAIL')
        console.log('===========================')

        log('error', `Error in db config: ${error.message}`)

        throw new Error(`Error in db config: ${error.message}`);
    }
}