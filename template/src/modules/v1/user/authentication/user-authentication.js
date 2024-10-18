import passport from 'passport';
import { Strategy } from 'passport-strategy';
import { Session } from '../../admin/models/session-model';
import { User } from '../models/user-model';
import { responseHandler } from '../../../../utils/response-handler';

class CustomUserAuthStrategy extends Strategy {
    constructor() {
        super();
    }

    async authenticate(req) {
        const token = req.headers.authorization;

        if (!token) {
            return this.fail('Missing authentication token', 401);
        }

        const sessionToken = token.split(' ')[1];

        try {
            const session = await Session.findOne({ session_token: sessionToken, status: 1 }).exec();

            if (!session) {
                return this.fail('Invalid or expired session token', 401);
            }

            const user = await User.findById(session.user_id);

            if (!user) {
                return this.fail('User not found', 401);
            }

            this.success(user);
        } catch (error) {
            console.error(error);
            return this.error('Internal server error', error);
        }
    }
}

// Create an instance of the custom strategy and use it with Passport
const customUserAuthStrategy = new CustomUserAuthStrategy();

class UserAuthentication {
    constructor() {
        // Use the custom strategy instead of JWT
        passport.use('user-custom', customUserAuthStrategy);
    }

    async check(req, res, next) {
        passport.authenticate('user-custom', { session: false }, (err, user) => {
            if (err) {
                console.error(err)
                return next(err);
            }
            if (!user) {
                return responseHandler.errorResponse(res, {}, 'Authentication failed', 401);
            }

            req.user = user;
            next();
        })(req, res, next);
    }
}

export default new UserAuthentication();
