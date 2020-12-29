import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from "typeorm";

@Entity()
export class Audit extends BaseEntity {

    constructor(data?: any) {
        super();

        if (!data) data = {};
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

    @Column()
    sucess: boolean = false

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    validate(): Promise<any> {
        throw new Error("Method not implemented to logs.");
    }
}
