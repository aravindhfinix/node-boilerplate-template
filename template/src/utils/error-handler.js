import { responseHandler } from "./response-handler";

export default class ErrorHandler {
    static handleError(err, req, res, next) {
        if (err.message === 'Not allowed by CORS') {
            console.error('Api hit from wrong IP cors error');
            responseHandler.errorResponse(res, {}, 'Please visit our official website', 403)
        } else {
            console.error(err);
            responseHandler.errorResponse(res, {}, 'Internal Server Error', 500)
        }
    }
}
