import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

import { entityBase } from "./abstractEntityBase";

@Entity()
export class ErrorCodes extends entityBase {

    constructor(data?: any) {
        super();

        if (!data) data = {};
        this.code = data.code;
        this.description = data.description;
        this.setTableName('ErrorCodes');
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

    validate(): Promise<any> {
        throw new Error("Method not implemented to ErrorsCode.");
    }
}
