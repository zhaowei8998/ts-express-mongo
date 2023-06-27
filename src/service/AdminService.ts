import { AdminAttributes, AdminModel } from "../database/mysql/models/AdminModel";

import BaseService from "./BaseService";

export default class AdminService extends BaseService {
    public async add(adminAddDTO:AdminAttributes):Promise<AdminAttributes> {
        const adminModel:any = await AdminModel.create({
            name: 'string',
            gender: 'string',
            phone: 'string'
        })
        return adminModel
    }

}
