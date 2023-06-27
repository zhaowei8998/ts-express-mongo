import { Sequelize } from 'sequelize-typescript';

import { MYSQL_CONFIG } from '../../configs';
import { sqlLogger } from '../../common/log4js';

const sequelize = new Sequelize(MYSQL_CONFIG.database, MYSQL_CONFIG.username, MYSQL_CONFIG.password, {
    host: MYSQL_CONFIG.host,
    port:MYSQL_CONFIG.port,
    dialect: MYSQL_CONFIG.dialect, /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    logging: (message:string) => {
        // 自定义日志输出逻辑
       sqlLogger.info(message)
      },
    pool: MYSQL_CONFIG.pool,
    define: MYSQL_CONFIG.define,
    query: MYSQL_CONFIG.query,
    models: [__dirname + '/models/'], 
});

export {sequelize};
