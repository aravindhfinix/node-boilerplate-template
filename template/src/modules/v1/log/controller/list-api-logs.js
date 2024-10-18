import { responseHandler } from "../../../../utils/response-handler";
import { ApiLog } from "../../admin/models/api-log-model";

class ListApiLogsController {
    /**
     * @description   API to get admin details
     * @param {*} req /api/v1/logs/list-api-logs
     * @param {*} res
     */
    async list(req, res) {
        try {

            const params = req.query.user_id ? { user_id: req.query.user_id } : {};

            const result = await ApiLog.find(params);

            if (result.length !== 0) {
                return responseHandler.successResponse(res, result, "Api logs list retrieved successfully from MongoDB", 200);
            } else {
                return responseHandler.errorResponse(res, [], "No api logs found", 200);
            }
        } catch (err) {
            console.error('Error in ListApiLogsController:', err);
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new ListApiLogsController();
