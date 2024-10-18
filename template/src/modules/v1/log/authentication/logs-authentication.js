import passport from 'passport';
import { Strategy } from 'passport-strategy';
import { responseHandler } from '../../../../utils/response-handler';

class CustomLogAuthStrategy extends Strategy {
    constructor() {
        super();
    }

    async authenticate(req, options) {
        const key = req.headers.key;

        if (!key) {
            console.log('kk')
            return this.fail('Missing api key', 401);
        }

        try {
            if (key !== process.env.LOG_API_KEY) {
                console.log('lll')
                return this.fail('Wrong api key', 401);
            }

            this.success(key);

        } catch (error) {
            return this.error('Internal server error', error);
        }
    }
}

// Create an instance of the custom strategy and use it with Passport
const customLogAuthStrategy = new CustomLogAuthStrategy();

class LogAuthentication {
    constructor() {
        // Use the custom strategy instead of JWT
        passport.use('log-custom', customLogAuthStrategy);
    }

    async check(req, res, next) {
        passport.authenticate('log-custom', { session: false }, (err, user) => {
            if (err) {
                return responseHandler.errorResponse(res, err);
            }
            if (!user) {
                return responseHandler.errorResponse(res, {}, 'Authentication failed', 401);
            }

            req.user = user;
            next();
        })(req, res, next);
    }
}

export default new LogAuthentication();
