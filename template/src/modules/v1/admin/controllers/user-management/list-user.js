import { redis } from "../../../../../config";
import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../../user/models/user-model";


class ListUserController {

  

    /**
      * @description   api to get user details
      * @param {*} req /api/v1/user/get-user/:id
      * @param {*} res 
      */

    async list(req, res) {

        try {
            const cachedUserList = await redis.getCache('userList');

            if (cachedUserList) {
                return responseHandler.successResponse(res, cachedUserList, "User list retrieved successfully from cache", 200);
            }

            const result = await User.find()
            if (result.length != 0) {

                await redis.setCache('userList', result);

                return responseHandler.successResponse(res, result, "User list retrived successfully", 200);
            } else {
                return responseHandler.errorResponse(res, result, "No users found", 200);
            }
        }
        catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ListUserController();

