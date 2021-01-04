import { getConnection } from "typeorm";
import { connectServerOnDB } from "../config/Db";
import { ErrorCodes } from "../entity/ErrorCodes.entity";
import { log } from "../utils/Util";

const exec = async () => {
    try {
        await connectServerOnDB();
        await getConnection().transaction(async transaction => {
            await transaction.getRepository(ErrorCodes).save({
                code: 1,
                description: 'Endereço não encontrado para essa localidade.'
            });

            setTimeout(() => {
                console.log('Finished');
                process.exit(1);
            }, 4000);
        })
    } catch (error) {
        const { message } = error;
        log('error', `Falha ao salvar os dados no db: ${message}`);
        throw new Error(message);
    }
}

exec();
