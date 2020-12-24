import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { denounciator } from "./interface";
import { denounciatorValidate } from "./validates/denounciators.validates";

@Entity()
export class Denunciators {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    validate(data: denounciator) {
        denounciatorValidate(data);
    }
}
