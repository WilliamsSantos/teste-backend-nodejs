import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { log } from "./interface";

@Entity()
export class Logs {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cpf: string;

    @Column()
    json_response: string;

    @Column()
    json_send: string;

    @Column()
    created_at: Date;

    validate(data:log){

    }
}
