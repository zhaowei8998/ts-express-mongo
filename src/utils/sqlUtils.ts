import { QueryTypes } from 'sequelize';
import { sequelize } from '../database/mysql/sequelize';

/**
 * 计算分页
 * @param page 页数
 * @returns 
 */
function paging(page: { sql: string, current: number, pageSize: number }): string {
    console.log(page)
    return `${page.sql} limit ${(page.current - 1) * page.pageSize},${page.pageSize}`
}

/**
 * 获取总数
 * @param page 
 * @returns 
 */
function pageCount(page: { sql: string }): string {
    return `select count(o1.*) from (${page.sql}) as o1`

}

/**
 * 分页查询
 * @param page 
 * @returns 
 */
async function pageQuery(page: { sql: string, current: 1, pageSize: 10 }) {
    const { sql, current, pageSize } = page
    console.log(paging({ sql, current, pageSize }))

    const rows: object[] = await sequelize.query(paging({ sql, current, pageSize }), { type: QueryTypes.SELECT })
    const count = await sequelize.query(pageCount({ sql }), { type: QueryTypes.SELECT })
    return { rows, count }
}
export { paging, pageCount, pageQuery }