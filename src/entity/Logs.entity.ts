import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

import { entityBase } from "./abstractEntityBase";

@Entity()
export class Logs extends entityBase {

    constructor(data?: any) {
        super();

        if (!data) data = {};
        this.cpf = data.cpf;
        this.json_response = data.json_response;
        this.json_send = data.json_send;
        this.setTableName('Logs')
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cpf: string;

    @Column()
    json_response: string;

    @Column()
    json_send: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    validate(): Promise<any> {
        throw new Error("Method not implemented to logs.");
    }
}
