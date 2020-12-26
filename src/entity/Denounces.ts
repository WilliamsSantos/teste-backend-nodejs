import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { denounce } from "./interface";
import { denounceValidate } from "./validates/denounces.validates";

@Entity()
export class Denounces {

    constructor(data:denounce){
        this.address_id = data.address_id;
        this.denunciator_id = data.denunciator_id;
        this.title = data.title;
        this.description = data.description;
    }

    @PrimaryGeneratedColumn()
    id: number;

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

    validate() {
        denounceValidate(this);
    }
}
