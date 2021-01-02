import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { DenunciatorObject } from "../interfaces/entity/Interface";
import { entityBase } from "./AbstractEntityBase";

import { denounciatorValidate } from "./validates/Denounciators.validates";

@Entity()
export class Denunciators extends entityBase {

    constructor(data: DenunciatorObject = {
        cpf: '',
        name: ''
    }) {
        super();

        const { name, cpf } = data;

        this.name = name;
        this.cpf = cpf;
        this.setTableName('Denunciators');
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
        return denounciatorValidate(this);
    }
}
