import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ErrorCodes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: number;

    @Column({
        length:500,
        default:"text"
    })
    description: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

}
