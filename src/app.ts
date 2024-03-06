import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import { logger } from './common/log4js';
import { PORT } from './configs';
import { sequelize } from './database/mysql/sequelize'
import ResultJson from './common/ResultJson';
import AuthTokenService from "./service/AuthTokenService";
import AdminService from "./service/AdminService";
import _ from "lodash";
class App {

    public app: express.Application;
    //public mongoUrl: string = 'mongodb://mongodb/CRMdb';

    constructor() {
        this.app = express();
        this.mongoSetup();
        this.mysqlConnection()
        this.logs();
        this.filter();
        this.config();
        this.process()
        this.expressErrors()

    }

    private config(): void {
        // support application/json type post data
        //this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

        //support application/x-www-form-urlencoded post data
        //this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.text({ limit: '20mb', type: function () { return true } }))
        this.app.use(['/uploadImg', '/uploadExcel', '/uploadIdaFile'], require('./middleware/upload'))
        //校验token
        // this.app.use((req, res, next) => {
        //     if (req.headers.hasOwnProperty('token')) {
        //         const token = Array.isArray(req.headers.token) ? req.headers.token[0] : req.headers.token;
        //         const authStatus = Auth.verify(token);
        //         authStatus ? next() : res.json(ResultJson.errorMsg('token过期，请重新登录'));

        //     } else {
        //         res.json(ResultJson.errorMsg('没有登录，请登录'));
        //     }
        // });
        // 校验token
        this.app.use(async function (req: any, res: any, next: any) {
            const authTokenService = new AuthTokenService();
            let anonymousPage = [
                '/user/login',
                '/finance/exportSummary',
                '/operation/demo-list',
            ]
            if (anonymousPage.includes(req.path)) {
                return next();
            }
            const token = req.get('Token') || _.get(req, 'query.token');
            if (_.isEmpty(token)) {
                return res.send(ResultJson.loginErrorMsg('token过期，请重新登录'));
            }
            const exists = await authTokenService.getByToken(token);
            if (_.size(exists) <= 0) {
                return res.send(ResultJson.loginErrorMsg('登录信息过期，请重新登录'));
            }
            const userInfo = await new AdminService().getProfile(exists.userId);
            if (_.isEmpty(userInfo.roleInfos)) {
                return res.send({ body: { code: 10002, err: '该账户异常，请联系系统管理员' } });
            }
            userInfo.roleName = _.map(userInfo.roleInfos, item => item.name).join(',');
            req.user = userInfo;
            req.user.token = token;

            next();
        });


        this.app.use(routes);

    }

    private mongoSetup(): void {
        //mongoose.connect(this.mongoUrl);
    }

    /**
     * error handler
     * @class Server
     * @method expressErrors
     */
    private expressErrors() {
        this.app.use((req, res, next) => {
            const errMessage = '访问异常';
            res.status(400);
            res.send(ResultJson.errorMsg(errMessage));
        });
    }
    private logs() {
        this.app.use((req, res, next) => {
            logger.info('----------------------------request----------------------------')
            logger.info('path => ', req.path)
            logger.info('head => ', req.headers)
            next();
        })
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
            logger.info(`ip:${req.ip}, hostname:${req.hostname}, path:${req.path}, body:${req.body ? JSON.stringify(req.body) : {}}`);
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', '*');
            // res.header('Access-Control-Allow-Headers', 'X-Requested-With');
            //res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
            res.header('X-Powered-By', ' 3.2.1');
            res.header('Content-Type', 'application/json;charset=utf-8');
            next();
        });
        //this.app.use('/*', (req, res, next) => {
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // if ('access-control-request-headers' in req.headers) {
        //     res.setHeader("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);
        //     res.end('');
        // } else {
        //     return next();
        // }


    }
    /**
     * server start
     * @class Server
     * @method start
     */
    public start() {
        this.app.set('port', PORT || 3000);
        this.app.listen(this.app.get('port'));
        logger.info('Express server listening on port ' + PORT);
    }

    public process() {
        // sequelize.sync({ force: true }).then(() => {
        //     console.log('sync successfully.');
        // }).catch(err => {
        //         console.error('Unable to sync:', err);
        //     });
        // console.log("所有模型均已成功同步.");
    }
    public async mysqlConnection() {
        await sequelize.sync();
    }

}

export default new App();
