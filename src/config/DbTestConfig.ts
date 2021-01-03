import { ConnectionOptions } from "typeorm";
import { Addresses, Denunciators, Denounces, Audit } from "../entity";

export const dbTestConfig: ConnectionOptions = {
    "type": "sqlite",
    "database": ":memory:",
    "dropSchema": true,
    "entities": [ Addresses, Denunciators, Denounces, Audit ],
    "synchronize": true,
    "logging": false
}