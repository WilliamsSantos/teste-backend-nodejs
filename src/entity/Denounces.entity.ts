import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { entityBase } from "./abstractEntityBase";
import { denounceValidate } from "./validates/denounces.validates";

@Entity()
export class Denounces extends entityBase {

    constructor(data?: any) {
        super();

        if (!data) data = {};
        this.address_id = data.address_id;
        this.denunciator_id = data.denunciator_id;
        this.title = data.title;
        this.description = data.description;
        this.setTableName('Denounces');
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
        return denounceValidate(this);
    }
}
