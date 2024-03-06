// common api result
const SUCCESS_CODE: number = 200;
const FAILURE_CODE: number = 500
const ERROR_CODE: number = 501
const SUCCESS_MSG: string = 'success'
const FAILURE_MSG: string = 'failure'
const ERROR_MSG: string = 'error'
export default class ResultJson {

    //通用返回结果
    public static result(result: { code: number, data: any, dataCount?: number, message: string }) {
        return { body: result }
    }

    /**
     * 通用成功
     * @returns 
     */
    public static success() {
        return this.result({ code: SUCCESS_CODE, data: [], message: SUCCESS_MSG })
    }

    /**
     * 带信息的成功
     * @param message 
     * @returns 
     */
    public static successMsg(message: any) {
        return this.result({ code: SUCCESS_CODE, data: [], message })
    }

    /**
     * 带数据的成功
     * @param data 
     * @returns 
     */
    public static successData(data: any) {
        return this.result({ code: SUCCESS_CODE, data, message: SUCCESS_MSG })
    }

    /**
     * 带分页数据的成功
     * @param data 
     * @param dataCount 
     * @returns 
     */
    public static successDataPage(data: any, dataCount: number) {
        return this.result({ code: SUCCESS_CODE, data, message: SUCCESS_MSG, dataCount })
    }

    // 失败
    public static failure() {
        return this.result({ code: FAILURE_CODE, data: [], message: FAILURE_MSG })
    }

    public static failureMsg(message: any) {
        return this.result({ code: FAILURE_CODE, data: [], message })
    }

    public static failureData(data: any) {
        return this.result({ code: FAILURE_CODE, data, message: FAILURE_MSG })
    }

    public static failureDataPage(data: any, dataCount: number) {
        return this.result({ code: FAILURE_CODE, data, message: FAILURE_MSG, dataCount })
    }

    // 错误
    public static error() {
        return this.result({ code: ERROR_CODE, data: [], message: ERROR_MSG })
    }

    public static errorMsg(message: any) {
        return this.result({ code: ERROR_CODE, data: [], message })
    }

    public static errorData(data: any) {
        return this.result({ code: ERROR_CODE, data, message: ERROR_MSG })
    }

    // 登录异常 未登录 token过期 无权限 无效token
    public static loginError() {
        return this.result({ code: 10001, data: [], message: '请先登录' })
    }
    public static loginErrorMsg(message: any) {
        return this.result({ code: 10001, data: [], message })
    }

}

