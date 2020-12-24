import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { address } from "./interface";
import { addressValidate } from "./validates/address.validates";

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("float")
    lat: number;

    @Column("float")
    lng: number;

    @Column("date")
    created_at: Date;

    @Column("date")
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
    postal_code: number
    
    validate(data: address) {
        addressValidate(data);
    }
}
