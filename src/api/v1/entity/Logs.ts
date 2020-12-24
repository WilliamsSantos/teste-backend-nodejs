import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Logs {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    denounce_id: string;

    @Column()
    json_reponse: string;

    @Column()
    json_send: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
