import { AdminModel } from "../database/mysql/models/AdminModel";
import BaseService from "./BaseService";
import _ from 'lodash'
import { sequelize } from '../database/mysql/sequelize';
import { Op, QueryTypes } from "sequelize";
import { md5 } from '../utils/tools';
import { logger } from "../common/log4js";
import { AdminRoleModel } from "../database/mysql/models/AdminRoleModel";
import RoleService from "./RoleService";
export default class AdminService extends BaseService {
    public async add(adminAddDTO: any): Promise<object> {
        if (!adminAddDTO) {
            throw new Error('参数不能为空')
        }
        const insertData = _.pick(JSON.parse(adminAddDTO), ['name', 'username', 'pwd', 'position', 'status'])
        if (!insertData.pwd) {
            throw new Error('密码不能为空')
        }
        if (!insertData.name) {
            throw new Error('用户名不能为空')
        }
        if (await AdminModel.findOne({ where: { name: insertData.name } })) {
            throw new Error('用户名已存在')
        }
        insertData.pwd = md5(insertData.pwd)

        const adminModel = await AdminModel.create(insertData)
        return adminModel.toJSON()
    }

    public async update(info) {
        const cols = ['name', 'position', 'status'];
        if (info.pwd) cols.push("pwd");
        const model = _.pick(info, cols);
        try {
            await AdminModel.update(model, { where: { id: info.id } });
        } catch (error) {
            logger.error(`AdminService.update: ${error}`)
            throw error;
        }
    }

    public async getByName(name) {
        let result: any = {}
        try {
            result = await AdminModel.findOne({
                where: {
                    name
                }
            })
        }
        catch (error) {
            logger.error(`AdminService.getByName: ${error}`)
            throw error;
        }
        return result

    }

    async getById(id) {
        let result: any = {}
        try {
            result = await AdminModel.findOne({
                where: {
                    id
                }
            })

        }
        catch (error) {
            logger.error(`AdminService.getById: ${error}`)
            throw error;
        }
        return result
    }
    getStatus(status) {
        switch (status) {
            case 1:
                return '已启用';
            case 2:
                return '已禁用';
            case 3:
                return '已删除';
            default:
                return '';
        }
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

        !name ?? Object.assign(where, { name: { [Op.like]: `%${name}%`, }, })

        !phone ?? Object.assign(where, { phone: { [Op.like]: `%${phone}%`, }, })

        !gender ?? Object.assign(where, { gender: { [Op.eq]: gender, }, })

        try {
            const { count, rows } = await AdminModel.findAndCountAll({
                where: {
                    ...where
                },
                offset: Number(current - 1),
                limit: Number(pageSize)
            });
            return { count, rows }
        } catch (e) {
            console.log(e)
        }

    }
    async getProfile(id) {
        let sql = `select a.*,r.roleId from admin a left join ${AdminRoleModel.tableName} r on r.userId=a.id where a.id=:id`;
        const users: any = await sequelize.query(sql, {
            replacements: { id: id },
            type: QueryTypes.SELECT
        });
        if (_.isEmpty(users)) {
            return {};
        }
        const user = users[0];
        const roleIds = _.map(_.filter(users, item => item.roleId), item => item.roleId);
        if (_.isEmpty(roleIds)) {
            return user;
        }

        user.roleInfos = await new RoleService().getList({ status: 1, ids: roleIds });
        return user;
    }
    //return await sequelize.query(sql, { type: QueryTypes.SELECT })
}


