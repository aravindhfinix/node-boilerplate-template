import { responseHandler } from '../../../../../utils/response-handler';
import { createSession, decrypt } from '../../../../../utils/encrypt';
import { User } from '../../models/user-model';

class LoginController {

    /**
     * @description   api to user login
     * @param {*} req /api/v1/user/login
     * @param {*} res 
     */

    async get(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return responseHandler.errorResponse(res, {}, 'No user exists with this email', 400);
            }

            if (user.status === 0) {
                return responseHandler.errorResponse(res, {}, 'You have been blocked by admin', 400);
            }

            if (decrypt(user.password) !== req.body.password) {
                return responseHandler.errorResponse(res, {}, 'Password is incorrect, please try again', 400);
            }

            const session = await createSession(user);
            return responseHandler.successResponse(res, { user, session }, 'User logged in successfully', 200);
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new LoginController();
