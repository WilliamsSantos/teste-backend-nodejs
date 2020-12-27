import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { denounceValidate } from "./validates/denounces.validates";

@Entity()
export class Denounces extends BaseEntity {

    constructor(data?: any) {
        if (!data) data = {};

        super();
        this.address_id = data.address_id;
        this.denunciator_id = data.denunciator_id;
        this.title = data.title;
        this.description = data.description;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({
        length: 35,
    })
    title: string;

    @Column({
        length: 500,
        default: "text"
    })
    description: string;

    @Column()
    denunciator_id: number;

    @Column()
    address_id: number;

    validate() {
        denounceValidate(this);
    }
}
