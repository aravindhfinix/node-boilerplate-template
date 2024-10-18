import { responseHandler } from "../../../../utils/response-handler";
const fs = require('fs');


class FileRemoveController {

  

    /**
     * @description  API for File delete
     * @param {*} req 
     * @param {*} res 
     */

    async delete(req, res) {

        try {
            const imagePath = req.body.imagePath.split(`${process.env.MONGODB_HOST}/`)[1]
            let filePath = (`/var/www/html/${imagePath}`);

            if (!fs.existsSync(filePath)) {
                return responseHandler.errorResponse(res, {}, "Image Not Exist", 400)
            }

            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        throw err;
                    }
                    return responseHandler.successResponse(res, {}, "Files Removed Successfully")
                })
            }
        }

        catch (err) {
            console.error(err);
            responseHandler.errorResponse(res, err);
        }

    }
}


export default new FileRemoveController();