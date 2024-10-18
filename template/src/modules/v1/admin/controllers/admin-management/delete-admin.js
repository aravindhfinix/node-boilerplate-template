import { responseHandler } from "../../../../../utils/response-handler";
import { Admin } from "../../models/admin-model";


class DeleteAdminController {

  

    /**
      * @description   api to admin signup
      * @param {*} req /api/v1/admin/signup
      * @param {*} res 
      */

    async delete(req, res) {

        try {
            const result = await Admin.findByIdAndDelete(req.params.id)
            if(result){
                return responseHandler.successResponse(res, result, "Admin details deleted successfully", 200);
            } else{
                return responseHandler.errorResponse(res, {}, "Admin details not found", 400);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new DeleteAdminController();

