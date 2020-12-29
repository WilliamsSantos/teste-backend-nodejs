import { getConnection } from "typeorm";
import { connectServerOnDB } from "../config/db";
import { ErrorCodes } from "../entity/ErrorCodes.entity";
import { log } from "../utils/util";

const exec = async () => {
    try {
        await connectServerOnDB();
        await getConnection().transaction(async transaction => {
            await transaction.getRepository(ErrorCodes).save({
                code: 1,
                description: "Requisição invalida, <property> não encontrado."
            })
            await transaction.getRepository(ErrorCodes).save({
                code: 2,
                description: "Cpf deve ter 11 digitos e não deve possuir barras pontos ou qualquer caracter especial."
            })
            await transaction.getRepository(ErrorCodes).save({
                code: 3,
                description: '<field> deve ter no minimo <property> digitos.'
            })
            await transaction.getRepository(ErrorCodes).save({
                code: 4,
                description: '<field> deve ter no máximo <property> digitos.'
            })
            await transaction.getRepository(ErrorCodes).save({
                code: 5,
                description: '<field> deve ter no minimo <property> letras.'
            })
            await transaction.getRepository(ErrorCodes).save({
                code: 6,
                description: '<field> deve ter no máximo <property> letras.'
            })
            await transaction.getRepository(ErrorCodes).save({
                code: 7,
                description: '<field> não informado.'
            })
            await transaction.getRepository(ErrorCodes).save({
                code: 8,
                description: '<field> não informado.'
            })
            await transaction.getRepository(ErrorCodes).save({
                code: 9,
                description: '<field> não informado.'
            })
            await transaction.getRepository(ErrorCodes).save({
                code: 10,
                description: '<field> não informado.'
            })
            await transaction.getRepository(ErrorCodes).save({
                code: 11,
                description: 'Endereço não encontrado para essa localidade.'
            })

            setTimeout(() => {
                console.log('Finished')
                process.exit(1);
            }, 4000);
        })
    } catch (error) {
        log('error', `Falha ao salvar os dados no db: ${error.message}`)
        throw new Error(error.message);
    }
}

exec();
