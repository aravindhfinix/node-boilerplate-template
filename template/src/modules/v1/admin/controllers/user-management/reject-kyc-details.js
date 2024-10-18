import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../../user/models/user-model";


class RejectUserController {

  

   /**
      * @description   API to reject user KYC details
      * @param {*} req /api/v1/user/signup
      * @param {*} res 
      */

    async update(req, res) {

        try {
            const result = await User.findByIdAndUpdate(req.params.id, { kyc_verified: 2 },{ new: true })
            if (result) {
                return responseHandler.successResponse(res, result, "User kyc details rejected successfully", 200);
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

export default new RejectUserController();

