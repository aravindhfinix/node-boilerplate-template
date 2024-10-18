import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';

class CategoryValidator {
    constructor() {
        this.schemas = {
            create: Joi.object({
                name: Joi.string().required().error(new Error("Name is required")),
                image: Joi.string().error(new Error("Image is required")),
            }),

            update: Joi.object({
                name: Joi.string().error(new Error("Enter a valid name")),
                image: Joi.string().error(new Error("Enter a valid image")),
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

    create = this.validateAndNext('create');
    update = this.validateAndNext('update');
}

export default new CategoryValidator();
