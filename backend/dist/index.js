"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const bluebird_1 = __importDefault(require("bluebird"));
switch (process.env.NODE_ENV) {
    case 'dev':
        dotenv_1.default.config({ path: '.env-dev' });
        break;
    case 'tst':
        dotenv_1.default.config({ path: '.env-tst' });
        break;
    case 'prd':
        dotenv_1.default.config({ path: '.env-prd' });
        break;
    default:
        console.error('No environment specified - exit');
        process.exit(1);
}
process.env.TZ = 'Europe/Berlin';
const mongouri = process.env.MONGODB_URI;
mongoose_1.default.Promise = bluebird_1.default;
const app_1 = __importDefault(require("./app"));
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        const status = yield mongoose_1.default.connect(mongouri, { autoReconnect: true, useNewUrlParser: true });
        console.log('Connection to mongodb established');
    }
    catch (e) {
        console.error('Check your mongodb connection: ' + e);
        process.exit(1);
    }
    try {
        const status = yield app_1.default.listen(app_1.default.get('port'));
        console.log(`App is running at http://localhost:${app_1.default.get('port')} in ${app_1.default.get('env')} mode`);
    }
    catch (e) {
        console.error('Check your express server: ' + e);
        process.exit(1);
    }
    console.log('Press CTRL-C to stop \n');
}))();
//# sourceMappingURL=index.js.map