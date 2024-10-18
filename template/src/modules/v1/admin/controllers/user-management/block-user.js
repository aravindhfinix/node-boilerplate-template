import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../../user/models/user-model";


class BlockUserController {

  

    /**
      * @description   api to user signup
      * @param {*} req /api/v1/user/signup
      * @param {*} res 
      */

    async update(req, res) {

        try {
            const result = await User.findByIdAndUpdate(req.params.id, { status: 0 }, { new: true })
            if (result) {
                return responseHandler.successResponse(res, result , "User blocked successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "User details not found", 400);
            }
        }
        catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new BlockUserController();

