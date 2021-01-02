require('dotenv').config();
require('winston-papertrail').Papertrail;
import * as transports from "winston-papertrail";
import * as winston  from "winston";
/**
 * =======================================
 * Configurations of environment variables
 * ======================================= 
 */

/**
 * API version config
 */
export const API_VERSION = process.env.API_VERSION;

/**
 * Basic rate-limiting middleware for Express. 
 * Use to limit repeated requests to public APIs and/or endpoints such as password reset.
 * https://github.com/nfriedly/express-rate-limit
 */
export const limitsRequestConfig = {
    "minutes":  10 * 60 * 1000,
    "maxRequestPermit": 100
};

/**
 * Basic rate-limiting middleware for Express.
 * Slows down responses rather than blocking them outright. 
 * Use to limit repeated requests to public APIs and/or endpoints such as password reset. 
 * https://github.com/nfriedly/express-slow-down
 */
export const handlerRequestsConfig = {
    "minutesToDelayRequestBegin": 15 * 60 * 1000,  // 15 minutes
    "requestsAllowMinutesConfig": 100, // allow 100 requests per 15 minutes, then...
    "startDelayPerRequestAbove": 500 // begin adding 500ms of delay per request above 100:
};

/**
 * GEO LOCALIZATION API configs
*/
export const geoConfig = {
   "host": process.env.GEO_HOST,
   "costumerKey": process.env.COSTUMER_KEY,
   "costumerSecret": process.env.COSTUMER_SECRET,
   "geoUrlApi": process.env.GEO_URL_API
};

/**
 * Log config variables
 */
let transportConfig: winston.transports.HttpTransportInstance;
if (process.env.NODE_ENV === "test") {
    transportConfig = new winston.transports.Http({
        "host": process.env.LOGS_HOST,
        "port": parseInt(process.env.LOGS_PORT),
        "ssl": true,
    });
} else {
    transportConfig = new transports.Papertrail({
        "host": process.env.LOGS_HOST,
        "port": parseInt(process.env.LOGS_PORT),
    })
}
export const transport = transportConfig;

/**
 * Redis config variables
 */
export const redisConfig = {
    "host": process.env.NODE_ENV === "test" ? process.env.REDIS_HOST_TEST : process.env.REDIS_HOST,
    "port": process.env.NODE_ENV === "test" ? process.env.REDIS_PORT_TEST : process.env.REDIS_PORT
};
