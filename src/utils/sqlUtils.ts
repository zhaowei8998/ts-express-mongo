import { QueryTypes } from 'sequelize';
import { sequelize } from '../database/mysql/sequelize';

function paging(page: { sql: string, current: number, pageSize: number }): string {
    console.log(page)
    return `${page.sql} limit ${(page.current - 1) * page.pageSize},${page.pageSize}`
}
function pageCount(page: { sql: string }): string {
    return `select count(o1.*) from (${page.sql}) as o1`

}
async function pageQuery(page: { sql: string, current: 1, pageSize: 10 }) {
    const { sql, current, pageSize } = page
    console.log(paging({ sql, current, pageSize }))

    const rows: object[] = await sequelize.query(paging({ sql, current, pageSize }), { type: QueryTypes.SELECT })
    const count = await sequelize.query(pageCount({ sql }), { type: QueryTypes.SELECT })
    return { rows, count }
}
export { paging, pageCount, pageQuery }