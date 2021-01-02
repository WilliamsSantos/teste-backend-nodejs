import * as winston from "winston";
import { transport } from "../src/config/Configurations";

export const logger = winston.createLogger({
	format: winston.format.simple(),
	levels: winston.config.syslog.levels,
	transports: [ transport ]
});