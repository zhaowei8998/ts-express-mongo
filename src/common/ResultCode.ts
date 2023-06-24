/**
 * 统一返回 data 对象
 */
class ResultJson {

    public static CODE_SUCCESS: number = 200;			// 成功状态码
    public static CODE_ERROR: number = 500;			// 错误状态码
    public static CODE_WARNING: number = 501;			// 警告状态码
    public static CODE_NOT_JUR: number = 403;			// 无权限状态码
    public static CODE_NOT_LOGIN: number = 401;		// 未登录状态码
    public static CODE_INVALID_REQUEST: number = 400;	// 无效请求状态码

    public code: Number
    public msg: String
    public data: any
    public dataCount: Number;	// 数据总数，用于分页

    constructor(code: number, msg: string, data: any, dataCount: number) {
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.dataCount = dataCount;
    }

    public static getSuccess() {
        return new this(ResultJson.CODE_SUCCESS, "ok", null, null);
    }

    public static getSuccessData(data?: any) {
        return new ResultJson(ResultJson.CODE_SUCCESS, "ok", data, null);
    }

    public static getSuccessMsg(msg?: string) {
        return new ResultJson(ResultJson.CODE_SUCCESS, msg, [], null);
    }

    public static getSuccessJson(code: number, msg: string, data: any,) {
        return new ResultJson(code, msg, data, null);
    }

    public static getFailure() {
        return new this(ResultJson.CODE_ERROR, "err", null, null);
    }

    public static getFailureData(data?: any) {
        return new ResultJson(ResultJson.CODE_ERROR, "err", data, null);
    }

    public static getFailureMsg(msg?: string) {
        return new ResultJson(ResultJson.CODE_ERROR, msg, [], null);
    }

    public static getFailureJson(code: number, msg: string, data: any,) {
        return new ResultJson(code, msg, data, null);
    }
}
export default ResultJson
