import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';

class FileUploadValidator {
    constructor() {
        this.schemas = {
            create: Joi.object({
                media: Joi.binary().required().error(new Error("Media is required")),
                service: Joi.string().required().error(new Error("Service is required")),
            })
        };
    }

    validateAndNext = (schemaName) => {
        return (req, res, next) => {
            const schema = this.schemas[schemaName];

            const { error } = schema.validate({
                media: req.files.media?.data, 
                service: req.body.service,
            });

            if (!error) {
                next();
            } else {
                const errorMessage = error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                return responseHandler.errorResponse(res, {}, errorMessage, 400);
            }
        };
    };

    create = this.validateAndNext('create');
}

export default new FileUploadValidator();
