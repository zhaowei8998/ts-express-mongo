import * as log4js from 'log4js';
import { LOG_CONFIG } from '../configs';
// log4js的输出级别6个: trace, debug, info, warn, error, fatal

log4js.configure(LOG_CONFIG);
export const logger = log4js.getLogger('app');
export const httpLogger = log4js.connectLogger(log4js.getLogger('http'), { level: 'WARN' });
