import _ from "lodash";
import BaseService from "./BaseService";
import { RoleInfoModel } from "../database/mysql/models/RoleInfoModel";
import { sequelize } from "../database/mysql/sequelize";
import { QueryTypes } from "sequelize";

export default class RoleService extends BaseService {

    public getCondition(params, values = []) {
        let sql = '';
        if (_.size(params.idNotIn) > 0) {
            sql += ' and id not in(:idNotIn)';
            values.push(params.idNotIn);
        }
        if (params.status) {
            sql += ' and status=:status';
            values.push(params.status);
        }
        if (_.size(params.statusList) > 0) {
            sql += ' and status in(:status)';
            values.push(params.statusList);
        }
        if (_.size(params.ids) > 0) {
            sql += ' and id in(:ids)';
            values.push(params.ids);
        }
        return sql;
    }

    async getList(params) {
        let sql = `select * from ${RoleInfoModel.tableName} where 1=1 `;
        let values = [];
        sql += this.getCondition(params, values);
        sql += ' order by id desc';
        if (params.page > 0 && params.pageSize > 0) {
            sql += ' limit ?,?';
            values.push((params.page - 1) * params.pageSize, params.pageSize);
        }
        return await sequelize.query(sql, { replacements: params, type: QueryTypes.SELECT })
    }
}