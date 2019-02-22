import express from 'express';
import logger from 'morgan';
import lusca from 'lusca';
import passport from 'passport';
import bodyParser from 'body-parser';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './doc/swagger.json';
import { Request, Response, NextFunction } from 'express';
import { errorHandler, unkownRouteHandler } from './core/express';
import { Template, I18n } from './misc';
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

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());
if (process.env.NODE_ENV !== 'test') {
    app.use(logger(logLevel));
}

app.use(bodyParser({ limit: '20mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(I18n.INFO_SUCCESS);
});

import { AuthRouter, UserRouter, OrderRouter, ProfileRouter, ProductRouter } from './routes';
import { TranslationManageRouter, ProductManageRouter } from './routes/manage';

app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/order', OrderRouter);
app.use('/profile', ProfileRouter);
app.use('/info', ProductRouter);

app.use('/manage/translation', TranslationManageRouter);
app.use('/manage/product', ProductManageRouter);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.all('*', unkownRouteHandler);

app.use(errorHandler);

export default app;
