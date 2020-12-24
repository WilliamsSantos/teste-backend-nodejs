import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { denounce } from "./interface";
import { denounceValidate } from "./validates/denounces.validates";

@Entity()
export class Denounces {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cpf: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
    
    @Column({
        length:35,
    })
	title: string;
    
    @Column({
        length:500,
        default:"text"
    })
    description: string;
    
    @Column()
    denunciator_id: number;

    @Column()    
    address_id: number;   

    validate(data: denounce) {
        denounceValidate(data);
    }
}
