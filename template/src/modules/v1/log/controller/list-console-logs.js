import fs from 'fs/promises';
import path from 'path';
import { responseHandler } from '../../../../utils/response-handler';
import { processAndSortLogs } from '../../../../config/console-logger';

class ListConsoleLogsController {
    async list(req, res) {
        try {
            const logFilePath = path.resolve(process.cwd(), 'logs/combined.log');
            const data = await fs.readFile(logFilePath, 'utf8');

            const logs = processAndSortLogs(data);

            responseHandler.successResponse(res, logs, 'Logs listed successfully', 200);
        } catch (error) {
            console.error('Error fetching logs:', error);
            responseHandler.errorResponse(res, error);
        }
    }
}

export default new ListConsoleLogsController();
