import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../models/user-model";

class VerifyEmail {

    /**
     * @description   API to reset password of user
     * @param {*} req /api/v1/user/password-reset-confirmation-mail/nckjeqdho32ou2098282
     * @param {*} res 
     */

    async update(req, res) {

        try {
            // check the reset token expiration
            User.findOneAndUpdate({ _id: req.params.id, reset_token: req.body.token, token_expires: { $gt: Date.now() } }, { $unset: { reset_token: 1, token_expires: 1 }, email_verified: 1 }, { new: true }).exec((err, result) => {
                if (err) return responseHandler.errorResponse(res, err);
                if (result) {
                    return responseHandler.successResponse(res, result, "User email verified", 200);
                } else {
                    return responseHandler.errorResponse(res, {}, 'Password reset token is invalid or has expired.', 400);
                }
            });

        }

        catch (err) {
            console.error(err);
            responseHandler.errorResponse(res, err);
        }

    }
}

export default new VerifyEmail();




