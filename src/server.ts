import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import compression from 'compression';
import * as bodyParser from 'body-parser';

import { generalRouter } from './routes/router';
import { appConfig } from './config/appConfig';

const APP_PORT = appConfig.port;
const APP_HOST = appConfig.host;

const app = express();

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.use(compression());
app.use(helmet({ contentSecurityPolicy: true, crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false }));

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(generalRouter);

export const server = app.listen(app.get('port'), app.get('host'), () => {
  console.log(`Server started at http://${app.get('host')}:${app.get('port')}`);
});

export default app;
