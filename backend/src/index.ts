import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

switch(process.env.NODE_ENV) {
    case 'dev': dotenv.config({ path: '.env-dev'}); break;
    case 'tst': dotenv.config({ path: '.env-tst'}); break;
    case 'prd': dotenv.config({ path: '.env-prd'}); break;
    default: console.error('No environment specified - exit'); process.exit(1);
}

process.env.TZ = 'Europe/Berlin';

const mongouri = process.env.MONGODB_URI as string;
(<any>mongoose).Promise = bluebird;

import app from './app';

(async () => {
    try {
        const status = await mongoose.connect(mongouri, { autoReconnect: true, useNewUrlParser: true });
        console.log('Connection to mongodb established');
    } catch (e) {
        console.error('Check your mongodb connection: ' + e);
        process.exit(1);
    }

    try {
        const status = await app.listen(app.get('port'));
        console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
    } catch (e) {
        console.error('Check your express server: ' + e);
        process.exit(1);
    }

    console.log('Press CTRL-C to stop \n');
})();