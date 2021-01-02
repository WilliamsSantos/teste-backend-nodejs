import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { entityBase } from "./AbstractEntityBase";

import { denounciatorValidate } from "./validates/Denounciators.validates";

@Entity()
export class Denunciators extends entityBase {

    constructor(data?: any) {
        super();

        if (!data) data = {};
        this.name = data.name;
        this.cpf = data.cpf;
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
