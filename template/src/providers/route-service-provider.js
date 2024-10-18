import BaseConfig from "../config/base-config";
import userRouter from "../modules/v1/user/routes";
import adminRouter from "../modules/v1/admin/routes";
import fileRouter from "../modules/v1/file-upload/routes/fileupload-routes"
import logsRouter from "../modules/v1/log/routes/index"
import basicAuth from 'express-basic-auth';
import { responseHandler } from "../utils/response-handler";
import path from 'path';

export default class RouteServiceProvider extends BaseConfig {

    constructor() {
        super();
        this.loadRoutes();
        this.routeNotFound();
    }

    /**
     * 
     * @param {*} route functions 
     */
    loadRoutes() {
        this.app.get('/', (req, res) => {
            responseHandler.successResponse(res, {}, 'Application is working');
        });
        this.app.use('/api/v1/logs', logsRouter);
        this.app.use('/api/v1/user', userRouter);
        this.app.use('/api/v1/admin', adminRouter);
        this.app.use('/api/v1/file-upload', fileRouter);
        this.app.use('/logs-page', basicAuth({
            users: { [process.env.LOG_USERNAME]: process.env.LOG_PASSWORD },
            challenge: true
        }));
        // Serve logs.html from the 'public' directory
        this.app.get('/logs-page', (req, res) => {
            const publicPath = path.join(__dirname, '../../public');
            res.sendFile(path.join(publicPath, 'logs.html'));
        });
    }


    routeNotFound() {
        this.app.use((req, res, next) => {
            return responseHandler.errorResponse(res, {}, 'Requested route not found', 404);
        });
    }
}