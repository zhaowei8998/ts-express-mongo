/**
 * 新版jwt 暂不使用 继续沿用旧版 Toekn.ts
 */
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../configs';
// 生成token
export default class Auth {
    public static sign(infoJson: any) {
        return jwt.sign(infoJson, JWT_CONFIG.secret, { expiresIn: '1d' });
    }
    public static verify(token: string) {
        return jwt.verify(token, JWT_CONFIG.secret);
    }
}