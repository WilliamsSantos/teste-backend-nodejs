require('dotenv').config()
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, prettyPrint, printf } = format;
require('winston-papertrail').Papertrail;

const HOST  = process.env.LOGS_HOST;
const PORT  = process.env.LOGS_PORT; 
const LEVEL = process.env.LOGS_LEVEL;

export const logger = new createLogger({
  	transports: [
  		new transports.Papertrail({
  			host: 'logs6.papertrailapp.com',
  			port: 20366,
  			logFormat: function(level, message) {
  			    return '<<<' + level + '>>> ' + message;
  			}
  		})
  	]
});

//logger.info('this is my message');