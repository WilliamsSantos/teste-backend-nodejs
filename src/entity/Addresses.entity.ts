import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { addressValidate } from "./validates/address.validates";

@Entity()
export class Addresses extends BaseEntity {

    constructor(data?: any) {
        if (!data) data = {};

        super();
        this.city = data.city;
        this.country = data.country;
        this.lat = data.lat;
        this.lng = data.lng;
        this.neightborhood = data.neightborhood;
        this.postal_code = data.postal_code;
        this.state = data.state;
        this.street = data.street;
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
    street: string

    @Column({
        length: 255
    })
    neightborhood: string

    @Column({
        length: 25
    })
    city: string

    @Column({
        length: 20
    })
    state: string

    @Column({
        length: 255
    })
    country: string

    @Column()
    postal_code: string

    validate() {
        addressValidate(this);
    }
}
