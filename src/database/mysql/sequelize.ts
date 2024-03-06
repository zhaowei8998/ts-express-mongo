// import { Sequelize } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript';

import { MYSQL_CONFIG } from '../../configs';
import { sqlLogger } from '../../common/log4js';
const config = {
    database: MYSQL_CONFIG.database,
    username: MYSQL_CONFIG.username,
    password: MYSQL_CONFIG.password,
    host: MYSQL_CONFIG.host,
    port: MYSQL_CONFIG.port,
    dialect: MYSQL_CONFIG.dialect, /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    logging: (message: string) => {
        // 自定义日志输出逻辑
        sqlLogger.info(message)
    },
    pool: MYSQL_CONFIG.pool,
    define: { ...MYSQL_CONFIG.define, timestamps: false },
    query: MYSQL_CONFIG.query,
    models: [__dirname + '/models/'],
    timezone: '+08:00',
    dialectOptions: {
        charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true
    },
}
const sequelize = new Sequelize(config);

export { sequelize, config };
