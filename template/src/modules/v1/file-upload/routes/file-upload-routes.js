import express from 'express';
import fileUploadController from '../controllers/file-upload-controller';
import fileRemoveController from '../controllers/file-remove-controller';
import fileResizeController from '../controllers/file-resize-controller';
import fileUploadValidator from '../validators/file-upload-validator';

const fileRouter = express.Router();


/**
 * file routes
 * @description file routes
 */

fileRouter.post('/upload', fileUploadValidator.create, fileUploadController.create);
fileRouter.post('/resize', fileResizeController.create);
fileRouter.delete('/remove', fileRemoveController.delete);


module.exports = fileRouter;