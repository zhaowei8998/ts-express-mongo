import { Request, Response } from 'express';
import ResultJson from '../common/ResultCode'
import AdminService from '../service/AdminService'
class AdminController {
    public add(req:Request,res:Response){
        const adminService = new AdminService()
        try {
            console.log(req.body)
            const result = adminService.add(req.body)
            res.send(ResultJson.getSuccessData(result))
        } catch (error) {
            res.send(ResultJson.getFailureData(error))
        }
    }
}
export {AdminController}
