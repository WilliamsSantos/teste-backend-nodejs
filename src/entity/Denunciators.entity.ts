import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

import { denounciatorValidate } from "./validates/denounciators.validates";

@Entity()
export class Denunciators extends BaseEntity {

    constructor(data?: any) {
        if (!data) data = {};

        super();
        this.name = data.name;
        this.cpf = data.cpf;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    validate() {
        denounciatorValidate(this);
    }
}
