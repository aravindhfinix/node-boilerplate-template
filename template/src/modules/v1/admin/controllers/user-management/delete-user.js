import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../../user/models/user-model";


class DeleteUserController {

  

    /**
      * @description   api to user delte
      * @param {*} req /api/v1/user/delte
      * @param {*} res 
      */

    async delete(req, res) {

        try {
            const result = await User.findByIdAndDelete(req.params.id)
            if(result){
                return responseHandler.successResponse(res, result, "User details deleted successfully", 200);
            } else{
                return responseHandler.errorResponse(res, {}, "User details not found", 400);
            }
        }
        catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new DeleteUserController();

