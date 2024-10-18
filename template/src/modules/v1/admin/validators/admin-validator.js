import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';

class AdminValidator {
    constructor() {
        this.schemas = {
            signup: Joi.object({
                name: Joi.string().required().error(new Error("Name is required")),
                email: Joi.string().required().error(new Error("Valid email is required")),
                phone_number: Joi.string().pattern(/^\+?[0-9\s]+$/).min(4).max(15).required().messages({
                    'string.pattern.base': 'Phone number must only contain digits',
                    "string.min": "Phone number must be minimum 4 digit number",
                    "string.max": "Phone number must be maximum 15 digit number",
                    "any.required": "Phone number is required"
                }),
                password: Joi.string().required().error(new Error("Please enter a valid password")),
            }),

            login: Joi.object({
                email: Joi.string().required().error(new Error("Email is required")),
                password: Joi.string().required().error(new Error("Please enter a valid password")),
            }),

            update: Joi.object({
                name: Joi.string().error(new Error("Enter a valid name")),
                email: Joi.string().error(new Error("Enter a valid email")),
                phone_number: Joi.string().pattern(/^\+?[0-9\s]+$/).min(4).max(15).messages({
                    'string.pattern.': 'Phone number must only contain digits',
                    "string.min": "Phone number must be minimum 4 digit number",
                    "string.max": "Phone number must be maximum 15 digit number",
                    "any.required": "Phone number is required"
                }),
                is_primary: Joi.boolean().error(new Error("Choose a proper account type")),
            }),
        };
    }

    validateAndNext = (schemaName) => {
        return (req, res, next) => {
            const schema = this.schemas[schemaName];
            const { error } = schema.validate(req.body);
            if (!error) {
                next();
            } else {
                const errorMessage = error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                return responseHandler.errorResponse(res, {}, errorMessage, 400);
            }
        };
    };

    signup = this.validateAndNext('signup');
    login = this.validateAndNext('login');
    update = this.validateAndNext('update');
}

export default new AdminValidator();
