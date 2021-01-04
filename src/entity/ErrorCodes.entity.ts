import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { ErrorCodeObject } from "../interfaces/entity/Interface";

import { entityBase } from "./AbstractEntityBase";

@Entity()
export class ErrorCodes extends entityBase {

    constructor(data: ErrorCodeObject = {
        code: 0,
        description: ""
    }) {
        super();
        const { code, description } = data;

        this.code = code;
        this.description = description;

        this.setTableName("ErrorCodes");
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

    validate(): Promise<Error> {
        throw new Error("Método ainda não implementado para  ErrorsCode.");
    }
}
