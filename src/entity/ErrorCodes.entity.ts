import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from "typeorm";

@Entity()
export class ErrorCodes extends BaseEntity {
    constructor(data?: any) {
        if (!data) data = {};

        super();
        this.code = data.code;
        this.description = data.description;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: number;

    @Column({
        length: 500,
        default: "text",
    })
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
