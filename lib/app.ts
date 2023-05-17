// lib/app.ts

import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://mongodb/CRMdb';

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();

    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl);
    }
}

export default new App().app;