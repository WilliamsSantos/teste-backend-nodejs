import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity
} from "typeorm";

@Entity()
export class Logs extends BaseEntity {

    constructor(data?: any) {
        if (!data) data = {};

        super();
        this.cpf = data.cpf;
        this.json_response = data.json_response;
        this.json_send = data.json_send;
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
}
