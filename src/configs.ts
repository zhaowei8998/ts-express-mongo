import fs from 'fs';
import path from 'path';

const env: string = process.env.NODE_ENV || 'dev';

const config_json = JSON.parse(fs.readFileSync(path.join(process.cwd(), `config.${env}.json`)).toString());

export const MYSQL_CONFIG = config_json.MYSQL;
export const LOG_CONFIG = config_json.LOG;
export const ALL_CONFIG = config_json;
export const PORT = config_json.WEB_PORT;
export const JWT_CONFIG = config_json.JWT;
