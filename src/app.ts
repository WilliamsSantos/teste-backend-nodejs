import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as logger  from "morgan";

import { connectServerOnDB } from "./config/db";

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

// database connect
connectServerOnDB();

import routerDenounces = require("./api/v1/routes/denounces");
app.use(`/api/${process.env.API_VERSION}/denuncias`, routerDenounces);

// No routing
app.use('*', (req: express.Request, res: express.Response) => {
    res.status(405).json('Router Not Implement');
});
