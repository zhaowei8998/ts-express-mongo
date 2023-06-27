import { Request, Response } from 'express';
import ResultJson from '../common/ResultCode'
import AdminService from '../service/AdminService'
class AdminController {
    public async add(req:Request,res:Response){
        const adminService = new AdminService()
        try {
            console.log(req.body)
            const result = await adminService.add(req.body)
            console.log(result)
            res.send(ResultJson.getSuccessData(result))
        } catch (error) {
            res.send(ResultJson.getFailureData(error))
        }
    }
    public async list(req:Request,res:Response){
        const adminService = new AdminService()
        try {
            const result = await adminService.list(req.body)
            console.log(result)
            res.send(ResultJson.getSuccessData(result))
        } catch (error) {
            res.send(ResultJson.getFailureData(error))
        }
    }
}
export {AdminController}
