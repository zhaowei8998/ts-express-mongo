import BaseService from "./BaseService";
import dayjs from "dayjs";
import _ from "lodash";
import { AuthTokenModel, AuthTokenAttributes } from "../database/mysql/models/AuthTokenModel";
import { logger } from "../common/log4js";

export default class AuthTokenService extends BaseService {

    public async add(info: any): Promise<void> {
        const model: AuthTokenAttributes = _.pick(info, ['userId', 'token', 'status'])
        model.created = dayjs().toDate()
        try {
            await AuthTokenModel.create(model)
        } catch (error) {
            logger.error(`AuthTokenService.add: ${error}`)
            throw error;
        }
    }

    public async getByToken(token, status = 1) {

        let result: AuthTokenAttributes = {}
        try {
            result = await AuthTokenModel.findOne({
                where: {
                    token,
                    status
                }
            })
        }
        catch (error) {
            logger.error(`AuthTokenService.getByToken: ${error}`)
            throw error;
        }
        return result
    }

    public async updateStatusByUserId(userId, status = 2) {
        let result: any = {}
        try {
            result = await AuthTokenModel.update({
                status
            }, {
                where: {
                    userId
                }
            })
        }
        catch (error) {
            logger.error(`AuthTokenService.updateStatusByUserId: ${error}`)
            throw error;
        }
        return result
    }

    public async updateStatusByToken(token, status = 2) {
        let result: any = {}
        try {
            result = await AuthTokenModel.update({
                status
            }, {
                where: {
                    token
                }
            })
        }
        catch (error) {
            logger.error(`AuthTokenService.updateStatusByToken: ${error}`)
            throw error;
        }
        return result
    }
}