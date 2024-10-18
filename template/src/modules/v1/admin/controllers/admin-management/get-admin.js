import { responseHandler } from "../../../../../utils/response-handler";
import { Admin } from "../../models/admin-model";


class GetAdminController {

  

    /**
      * @description   api to get admin details
      * @param {*} req /api/v1/admin/get-admin/:id
      * @param {*} res 
      */

    async get(req, res) {

        try {
            const result = await Admin.findById(req.params.id)
            if(result){
                return responseHandler.successResponse(res, result, "Admin details retrived successfully", 200);
            } else{
                return responseHandler.errorResponse(res, {}, "Admin details not found", 400);
            }
        }
        catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new GetAdminController();

