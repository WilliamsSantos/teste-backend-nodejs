import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as loggerMorgan  from "morgan";
import * as expressWinston from "express-winston";
import { logger } from "../logs";
import { connectServerOnDB } from "./config/db";
import { log } from "./utils/util";

export const app = express();

// ROUTES
import routerDenounces = require("./api/v1/routes/denounces");
import routerGeo = require("./api/v1/routes/geo");

function requestDenouncesMiddleware(request: express.Request, response: express.Response, next) {
  const data = request.body,
        objectPropertsAccept = [
          'latitude', 
          'longitude', 
          { 
            'denunciante': [
              'nome',
              'cpf'
            ] 
          }, 
          { 
            'denuncia': [
              'titulo', 
              'descricao'
            ] 
          },
          'nome', 
          'cpf'
        ];

  const errors:Array<object> = [];
  objectPropertsAccept.forEach(item => {
		if(typeof item != 'object'){
			if(!data.hasOwnProperty(item)){
        errors.push({'campo': item, 'description': `Campo ${item} requerido!`});
			}
    } else {
			let property = Object.getOwnPropertyNames(item)[0];
      for(let i of item[property]){
        if(!data[property].hasOwnProperty(i)){
          errors.push({'campo': item, 'description': `Campo ${item} requerido!`});
        }
      }
		}
  })  

  if (errors.length) {
    log('error', `Request middleware error: ${JSON.stringify(errors)}`);
    return response.status(403).json(errors);
  } else {
    next();
  }
}

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

app.use(`/api/${process.env.API_VERSION}/denuncias`, requestDenouncesMiddleware, routerDenounces);
app.use(`/api/${process.env.API_VERSION}/geo`, routerGeo);

// No routing indexed
app.use('*', (req: express.Request, res: express.Response) => {
  return res.status(405).json('Router Not Implement');
});
