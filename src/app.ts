import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as loggerMorgan from "morgan";
import * as expressWinston from "express-winston";
import { logger } from "../logs";
import { connectServerOnDB } from "./config/db";
import {
  validateRequestDenouncesMiddleware
} from "./api/middlewares/requestDenouncesMiddleware";

export const app = express();

// ROUTES
import routerDenounces = require("./api/v1/routes/denounces");

app.set('trust proxy', 1);
app.use(cors());
app.use(bodyParser.json());
app.use(loggerMorgan('dev'));
app.use(expressWinston.logger({
  transports: [logger],
  meta: false,
  msg: `{{req.ip}} - {{res.statusCode}} - {{req.method}} - {{res.responseTime}}ms - {{req.url}} - {{req.headers['user-agent']}}`,
  expressFormat: false,
  colorize: true
}));

// database connect
connectServerOnDB();

app.use(`/${process.env.API_VERSION}/denuncias`, validateRequestDenouncesMiddleware, routerDenounces);

// No routing indexed
app.use('*', (_req: express.Request, res: express.Response) => {
  return res.status(405).json('Router Not Implement');
});
