import { Sequelize } from 'sequelize-typescript';

import { MYSQL_CONFIG } from '../configs';
console.log('MYSQL_CONFIG',MYSQL_CONFIG)
// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize(MYSQL_CONFIG.database, MYSQL_CONFIG.username, MYSQL_CONFIG.password, {
    host: MYSQL_CONFIG.host,
    port:MYSQL_CONFIG.port,
    dialect: MYSQL_CONFIG.dialect, /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    logging: MYSQL_CONFIG.logging,
    pool: MYSQL_CONFIG.pool,
    define: MYSQL_CONFIG.define,
    query: MYSQL_CONFIG.query,
    models: [__dirname + '/models'], // or [Player, Team],
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
 .catch(err => {
 console.error('Unable to connect to the database:', err);
});
export {sequelize};
