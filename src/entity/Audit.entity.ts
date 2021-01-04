/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from "typeorm";
import { AuditObject } from "../interfaces/entity/Interface";

@Entity()
export class Audit extends BaseEntity {

    constructor(data: AuditObject = {
        cpf: '',
        json_response: '',
        json_send: '',
        sucess: false
    }) {
        super();
        const { json_response, cpf, json_send } = data

        this.cpf = cpf;
        this.json_response = json_response;
        this.json_send = json_send;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cpf: string;

    @Column()
    json_response: string;

    @Column()
    json_send: string

    @Column()
    sucess: boolean = false

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    validate(): Promise<Error> {
        throw new Error("Method not implemented to logs.");
    }
}
