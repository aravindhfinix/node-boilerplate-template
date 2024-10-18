import { responseHandler } from "../../../../../utils/response-handler";
import { createSession, encrypt } from "../../../../../utils/encrypt";
import { Admin } from "../../models/admin-model";


class SignupController {

  

    /**
      * @description   api to admin signup
      * @param {*} req /api/v1/admin/signup
      * @param {*} res 
      */

    async create(req, res) {

        try {
            req.body.password = encrypt(req.body.password)
            const admin = await Admin.create(req.body)
            if (admin) {
                const session = await createSession(admin)
                return responseHandler.successResponse(res, { admin, session }, "admin signup successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "admin creation failed", 400);

            }
        }
        catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new SignupController();

