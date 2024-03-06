import { Request, Response } from 'express';
import ResultJson from '../common/ResultJson'
import AdminService from '../service/AdminService'
import { logger } from '../common/log4js';
class AdminController {
    public async add(req: Request, res: Response) {
        const adminService = new AdminService()
        try {
            console.log(req.body)
            const result = await adminService.add(req.body)
            console.log(result)
            res.send(ResultJson.successData(result))
        } catch (error) {
            logger.error(error)
            res.send(ResultJson.failureMsg(error.message))
        }
    }
    public async list(req: Request, res: Response) {
        const adminService = new AdminService()
        try {
            const result = await adminService.list(req.body)
            console.log(result)
            res.send(ResultJson.successData(result))
        } catch (error) {
            res.send(ResultJson.failureMsg(error.message))
        }
    }
}
export { AdminController }
