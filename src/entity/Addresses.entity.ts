import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { addressValidate } from "./validators/Address.validator";
import { entityBase } from "./AbstractEntityBase";
import { Address } from "../interfaces/entity/Interface";

@Entity()
export class Addresses extends entityBase {

    constructor(data: Address = {
        lat: 0,
        lng: 0,
        country: '',
        state: '',
        city: '',
        neightborhood: '',
        street: '',
        postal_code: '',
    }) {
        super();
        const { city, country, lat, lng,
            neightborhood, postal_code, state, street } = data;

        this.city = city;
        this.country = country;
        this.lat = lat;
        this.lng = lng;
        this.neightborhood = neightborhood;
        this.postal_code = postal_code;
        this.state = state;
        this.street = street;

        this.setTableName('Addresses');
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("float")
    lat: number;

    @Column("float")
    lng: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({
        length: 255
    })
    street: string;

    @Column({
        length: 255
    })
    neightborhood: string;

    @Column({
        length: 25
    })
    city: string;

    @Column({
        length: 20
    })
    state: string;

    @Column({
        length: 255
    })
    country: string;

    @Column()
    postal_code: string;

    validate():Promise<Error> {
        return new addressValidate(this).validate();
    }
}
