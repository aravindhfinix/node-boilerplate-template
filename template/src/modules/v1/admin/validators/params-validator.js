import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';
Joi.objectId = require('joi-objectid')(Joi);

class ParamsValidator {
    constructor() {
        this.schema = Joi.objectId().required().error(new Error("Please provide a proper id"));
    }

    validate = (req, res, next) => {
        try {
            const { error } = this.schema.validate(req.params.id);
            if (!error) {
                next();
            } else {
                return responseHandler.errorResponse(res, {}, error.message, 400);
            }
        } catch (err) {
            console.error(err);
            responseHandler.errorResponse(res, err);
        }
    };
}

export default new ParamsValidator();
