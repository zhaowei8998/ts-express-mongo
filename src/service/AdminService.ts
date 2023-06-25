import { AdminAttributes, AdminModel } from "models/mysql/Admin.model";

import BaseService from "./BaseService";

export default class AdminService extends BaseService {
    public async add(adminAddDTO:AdminAttributes):Promise<AdminAttributes> {
        const adminModel:AdminAttributes = await AdminModel.create({
            name: 'string',
            gender: 'string',
            phone: 'string'
        })
        return adminModel
    }

}