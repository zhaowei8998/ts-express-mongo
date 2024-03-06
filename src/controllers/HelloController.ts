import { Request, Response, NextFunction } from 'express';
import ResultJson from '../common/ResultJson';
import Controller from './Controller';
export class HelloController extends Controller {
    public hello(req: Request, res: Response, next: NextFunction) {
        res.send(ResultJson.successMsg('Hello World!'));
    }
}