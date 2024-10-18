import { encrypt } from "../../../../../utils/encrypt";
import mailContent from "../../../../../utils/mail-content";
import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../models/user-model";


class ResetUserPasswordController {

    /**
      * @description   api to update user 
      * @param {*} req /api/v1/user/update
      * @param {*} res 
      */

    async update(req, res) {

        try {
            // check the reset token expiration
            const result = await User.findOneAndUpdate({ _id: req.params.id, reset_token: req.body.token, token_expires: { $gt: Date.now() } }, { $unset: { reset_token: 1, token_expires: 1 }, password: encrypt(req.body.password) }, { new: true })
            if (result) {
                mailContent.passwordResetSuccess(result)
                return responseHandler.successResponse(res, result, "User email verified", 200);
            } else {
                return responseHandler.errorResponse(res, {}, 'Password reset token is invalid or has expired.', 400);
            }
        }
        catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ResetUserPasswordController();

