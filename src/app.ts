import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes/routes";
import * as mongoose from "mongoose";
import { httpLogger, logger } from './common/log4js';
import { PORT } from './configs';
import { sequelize } from './config/sequelize';

class App {

    public app: express.Application;
    public mongoUrl: string = 'mongodb://mongodb/CRMdb';

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.filter();
        this.expressErrors()
        this.process()
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(routes);

    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl);
    }

    /**
     * error handler
     * @class Server
     * @method expressErrors
     */
    private expressErrors() {
        this.app.use((req, res, next) => {
            const errMessage = '访问异常';
            res.send({ status: 'error', data: null, message: errMessage });
        });
    }

    /**
     * Create service filter
     * @class Server
     * @method filter
     */
    private filter() {
        // service filter
        this.app.all('/*', (req, res, next) => {
            // create access logs
            logger.warn(`ip:${req.ip}, hostname:${req.hostname}, path:${req.path}, body:${req.body ? JSON.stringify(req.body) : {}}`);
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', '*');
            // res.header('Access-Control-Allow-Headers', 'X-Requested-With');
            res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
            res.header('X-Powered-By', ' 3.2.1');
            res.header('Content-Type', 'application/json;charset=utf-8');
            next();
        });
    }
    /**
     * server start
     * @class Server
     * @method start
     */
    public start() {
        this.app.set('port', PORT || 3000);
        this.app.listen(this.app.get('port'));
        console.log('Express server listening on port ' + PORT);
    }

    public async process(){
        await sequelize.sync({ force: true });
        console.log("所有模型均已成功同步.");
    }
}

export default new App();