/**
 * md5加密
 * @param str 
 * @returns 
 */
export const md5 = (str: string) => {
    return require('crypto').createHash('md5').update(str).digest('hex');
}