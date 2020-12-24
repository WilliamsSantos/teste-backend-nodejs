import { logger } from "../../logs";

export function log(type:string, message:string | object) :void {
    logger[type](message);
}