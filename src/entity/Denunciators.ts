import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { denounciator } from "./interface";
import { denounciatorValidate } from "./validates/denounciators.validates";

@Entity()
export class Denunciators {

    constructor(data:denounciator) {
        this.name = data.name;
        this.cpf = data.cpf;
    }

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

    validate() {
        denounciatorValidate(this);
    }
}
