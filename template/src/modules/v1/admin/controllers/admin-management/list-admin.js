import { responseHandler } from "../../../../../utils/response-handler";
import { Admin } from "../../models/admin-model";
import { redis } from "../../../../../config/index";

class ListAdminController {
  

    /**
     * @description   API to get admin details
     * @param {*} req /api/v1/admin/get-admin/:id
     * @param {*} res
     */
    async list(req, res) {
        try {
            const cachedAdminList = await redis.getCache('adminList');

            if (cachedAdminList) {
                return responseHandler.successResponse(res, cachedAdminList, "Admin list retrieved successfully from cache", 200);
            }

            const result = await Admin.find();

            if (result.length !== 0) {
                
                await redis.setCache('adminList', result);

                return responseHandler.successResponse(res, result, "Admin list retrieved successfully from MongoDB", 200);
            } else {
                return responseHandler.errorResponse(res, [], "No admins found", 200);
            }
        } catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new ListAdminController();
