import { ApiLog } from '../modules/v1/admin/models/api-log-model';
import { Session } from '../modules/v1/admin/models/session-model';

class ApiLogger {
    async createLog(req, res, next) {
        try {
            const startTime = new Date(); // Record the start time
            let responseData = ''; // Variable to store response data

            // Override res.send to capture response data
            const originalSend = res.send;
            res.send = function (body) {
                responseData = JSON.parse(body); // Capture response data
                originalSend.call(res, body); // Call the original send method
            };

            res.on('finish', async () => {
                const endTime = new Date(); 
                const processTime = endTime - startTime; 
            
                // Extract user_id and session
                let user_id = '';
                let session = '';
                if (req.headers.authorization) {
                    const authToken = req.headers.authorization;
                    session = authToken?.split(' ')[1];
                    const user = await Session.findOne({ session_token: session });
                    user_id = String(user?.user_id) || '';
                }

                // Create log data
                const logData = {
                    request_user_agent: req.headers['user-agent'],
                    request_host: req.headers['origin'] || req.headers.host,
                    method: req.method,
                    protocol: req.protocol,
                    request_url: req.originalUrl,
                    type: res.statusCode !== 200 ? 2 : 1,
                    status_code: res.statusCode,
                    status_message: res.statusMessage,
                    content_length: `${res.get('Content-Length') || 0} bytes`,
                    requested_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                    remote_address: req.connection.remoteAddress,
                    request_ip: req.ip,
                    request_body: req.body,
                    response_message: responseData?.message || '',
                    user_id,
                    session,
                    process_time: `${processTime} ${unitCalculation(processTime)}`,
                };

                // Store logs
                await ApiLog.create(logData);
                console.log(logData);
            });

            next();
        } catch (err) {
            console.error('Error creating logs:', err.message);
            next();
        }
    }
}

export default new ApiLogger();

const unitCalculation = (processTime) => {
    let unit = 'ms';

    // Convert to seconds if processTime is >= 1000 milliseconds
    if (processTime >= 1000) {
        if (processTime >= 60 * 60 * 1000) {
            // Convert to hours
            processTime /= 60 * 60 * 1000;
            unit = 'hrs';
        } else if (processTime >= 60 * 1000) {
            // Convert to minutes
            processTime /= 60 * 1000;
            unit = 'min';
        } else {
            // Convert to seconds
            processTime /= 1000;
            unit = 's';
        }
    }

    return unit;
};
