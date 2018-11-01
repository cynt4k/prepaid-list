"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const lusca_1 = __importDefault(require("lusca"));
const passport_1 = __importDefault(require("passport"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
let logLevel = 'dev';
switch (process.env.NODE_ENV) {
    case 'test':
        logLevel = '';
        break;
    case 'dev':
        logLevel = 'dev';
        break;
    case 'prd':
        logLevel = 'common';
        break;
    default:
        console.log('No environement specified - exit');
        process.exit(1);
        break;
}
const app = express_1.default();
app.set('port', process.env.PORT || 3000);
app.use(compression_1.default());
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan_1.default(logLevel));
}
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(lusca_1.default.xframe('SAMEORIGIN'));
app.use(lusca_1.default.xssProtection(true));
app.use(passport_1.default.initialize());
app.get('/', (req, res, next) => {
    res.status(200).send('OK');
});
exports.default = app;
//# sourceMappingURL=app.js.map