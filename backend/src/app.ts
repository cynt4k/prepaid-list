import express from 'express';
import logger from 'morgan';
import lusca from 'lusca';
import passport from 'passport';
import bodyParser from 'body-parser';
import compression from 'compression';
import { Request, Response, NextFunction } from 'express';
import { errorHandler, unkownRouteHandler } from './core/express';
import { Template } from './misc';
import i18n from 'i18n';
import './types/express';
import methodOverride from 'method-override';
import './core/auth';

let logLevel = 'dev';

switch (process.env.NODE_ENV) {
    case 'test': logLevel = ''; break;
    case 'dev': logLevel = 'dev'; break;
    case 'prd': logLevel = 'common'; break;
    default: console.log('No environement specified - exit'); process.exit(1); break;
}

i18n.configure({
    locales: ['en', 'de'],
    directory: `${__dirname}/locales`,
    syncFiles: true
});

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());
if (process.env.NODE_ENV !== 'test') {
    app.use(logger(logLevel));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());
app.use(i18n.init);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(res.__(Template.I18N_INFO_SUCCESS));
});

import { AuthRouter, UserRouter, OrderRouter } from './routes';

app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/order', OrderRouter);

app.all('*', unkownRouteHandler);

app.use(errorHandler);

export default app;
