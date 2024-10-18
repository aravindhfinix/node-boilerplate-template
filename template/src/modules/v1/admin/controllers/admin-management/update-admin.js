import { responseHandler } from "../../../../../utils/response-handler";
import { Admin } from "../../models/admin-model";


class UpdateAdminController {

  

    /**
      * @description   api to update admin 
      * @param {*} req /api/v1/admin/update
      * @param {*} res 
      */

    async update(req, res) {

        try {
            const result = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (result) {
                return responseHandler.successResponse(res, result, "Admin details updated successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Admin details not found", 400);
            }
        }
        catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new UpdateAdminController();

