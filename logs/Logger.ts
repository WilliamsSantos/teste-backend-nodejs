require('dotenv').config();
const { createLogger, transports } = require("winston");
require('winston-papertrail').Papertrail;
const winston = require("winston");
const HOST = process.env.LOGS_HOST;
const PORT = process.env.LOGS_PORT;
const LEVEL = process.env.LOGS_LEVEL;

const transport = new winston.transports.Http({
	host: HOST,
	port: PORT,
	ssl: true,
});
const papertrailTransport = new transports.Papertrail({
	host: HOST,
	port: PORT,
})
export const logger = winston.createLogger({
	format: winston.format.simple(),
	levels: winston.config.syslog.levels,
	transports: [
		process.env.NODE_ENV === 'test' ? transport : papertrailTransport 
	]
});