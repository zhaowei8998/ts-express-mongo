import { AdminModel } from "../database/mysql/models/AdminModel";
import BaseService from "./BaseService";
import _ from "lodash"
import { AdminInterface } from "database/mysql/interface/AdminInterface";
import { pageQuery } from '../utils/sqlUtils';
import { sequelize } from '../database/mysql/sequelize';
import { Op, QueryTypes, WhereOptions } from "sequelize";

export default class AdminService extends BaseService {
    public async add(adminAddDTO: AdminInterface): Promise<object> {
        const adminModel = await AdminModel.create(adminAddDTO)
        return adminModel.toJSON()
    }
    public async list(adminSelectDTO: any) {
        //const adminModel = await AdminModel.findAll(adminSelectDTO)
        // return adminModel
        let sql = 'select * from where 1=1 '
        const { current = 1, pageSize = 10, name, phone, gender } = adminSelectDTO
        console.log(sql, current, pageSize)

        // const { count, rows } = await pageQuery({ sql, current, pageSize })
        // console.log({ count, rows })
        // return { count, rows }
        let where: object = {};
        if (name) {
            Object.assign(where, {
                name: {
                    [Op.like]: `%${name}%`,
                },
            })
        }
        if (phone) {
            Object.assign(where, {
                phone: {
                    [Op.like]: `%${phone}%`,
                },
            })
        }
        if (gender) {
            Object.assign(where, {
                phone: {
                    [Op.eq]: gender,
                },
            })
        }
        try {
            const { count, rows } = await AdminModel.findAndCountAll({
                where: {
                    ...where
                },
                offset: Number(current-1),
                limit: Number(pageSize)
            });
            return { count, rows }
        } catch (e) {
            console.log(e)
        }

    }

    //return await sequelize.query(sql, { type: QueryTypes.SELECT })
}


