import { responseHandler } from "../../../../utils/response-handler";
import sharp from 'sharp';
import fs from 'fs'
import { File } from "../models/fileupload-model";

class FileResizeController {


    /**
     * @description  API for File resize
     * @param {*} req 
     * @param {*} res 
     */

    async create(req, res) {

        try {
            const requiredWidth = req.body.width;
            const requiredHeight = req.body.height;
            const imageFolderName = new Date().valueOf();
            const imagePath = `/var/www/html/${req.body.image.split(`${process.env.MONGODB_HOST}/`)[1]}`
            const image = sharp(imagePath);

            // get the image metadata to determine the image dimensions
            const metadata = await image.metadata();

            // calculate the aspect ratio of the original image
            const aspectRatio = metadata.width / metadata.height;

            // calculate the width and height of the resized image while maintaining the aspect ratio
            const width = aspectRatio >= 1 ? requiredWidth : Math.round(requiredHeight * aspectRatio);
            const height = aspectRatio >= 1 ? Math.round(requiredWidth / aspectRatio) : requiredHeight;

            const directoryPath = `/var/www/html/${process.env.UPLOADS_PATH}/resized-images/${imageFolderName}`

            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true });
            }

            const fileName = imagePath.split('/').pop();
            const extension = fileName.split('.').pop();
            const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
            const newName = `${nameWithoutExtension}(${requiredWidth}x${requiredHeight}).${extension}`;
            const uploadPath = `${directoryPath}/${newName}`;
            // resize and compress the image
            await image.resize(width, height, { fit: 'inside' }).jpeg({ quality: 80 }).toFile(uploadPath);
            const data = { resized_image: `http://${process.env.MONGODB_HOST}/${process.env.UPLOADS_PATH}/resized-images/${imageFolderName}/${newName}` }
            await updateFile(req.body.image, data.resized_image)
            responseHandler.successResponse(res, data, 'Image resized successfully')

        }

        catch (err) {
            console.error(err);
            responseHandler.errorResponse(res, err);
        }

    }
}


export default new FileResizeController();


const updateFile = async (actual, resized) => {
    return await File.findOneAndUpdate({ file: actual }, { $addToSet: { resized_image: [resized] } });
};
