import express from 'express';
import listApiLogs from '../controller/list-api-logs';
import listConsoleLogs from '../controller/list-console-logs';
import logsAuthentication from '../authentication/logs-authentication';

const logRouter = express.Router();

/**
 * admin routes
 * @description admin routes
 */

//admin management routes
logRouter.get('/api-logs', [logsAuthentication.check], listApiLogs.list);
logRouter.get('/console', [logsAuthentication.check], listConsoleLogs.list)

module.exports = logRouter;