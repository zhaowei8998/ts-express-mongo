import ResultJson from '../common/ResultJson'
import _ from 'lodash';
import AuthTokenService from 'service/AuthTokenService';
import AdminService from 'service/AdminService';
export async function verify(req: any, res: any, next: any) {
    const authTokenService = new AuthTokenService();
    let anonymousPage = [
        '/user/login',
        '/finance/exportSummary',
        '/operation/demo-list',
    ]
    if (anonymousPage.includes(req.path)) {
        return next();
    }
    const token = req.get('Token') || _.get(req, 'query.token');
    if (_.isEmpty(token)) {
        return res.send(ResultJson.loginErrorMsg('token过期，请重新登录'));
    }
    const exists = await authTokenService.getByToken(token);
    if (!(_.size(exists) > 0)) {
        return res.send(ResultJson.loginErrorMsg('登录信息过期，请重新登录'));
    }
    const userInfo = await new AdminService().getProfile(exists[0].userId);
    if (_.isEmpty(userInfo.roleInfos)) {
        return res.send({ body: { code: 10002, err: '该账户异常，请联系系统管理员' } });
    }
    userInfo.roleName = _.map(userInfo.roleInfos, item => item.name).join(',');
    req.user = userInfo;
    req.user.token = token;

    next();
}