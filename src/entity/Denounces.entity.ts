import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { DenounceObject } from "../interfaces/entity/Interface";
import { entityBase } from "./AbstractEntityBase";
import { DenounceValidate } from "./validators/Denounces.validator";

@Entity()
export class Denounces extends entityBase {

    constructor(data: DenounceObject = {
        address_id: 0,
        denunciator_id: 0,
        description: '',
        title: ''
    }) {
        super();
        const { address_id, denunciator_id, title, description } = data;

        this.address_id = address_id;
        this.denunciator_id = denunciator_id;
        this.title = title;
        this.description = description;

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

    validate():Promise<Error> {
        return new DenounceValidate(this).validate();
    }
}
