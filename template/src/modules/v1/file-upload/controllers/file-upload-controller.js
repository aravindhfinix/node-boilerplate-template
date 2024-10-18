import { responseHandler } from "../../../../utils/response-handler";
import { File } from "../models/fileupload-model";

class FileUpload {
    /**
     * @description API for File upload
     * @param {*} req
     * @param {*} res
     */
    async create(req, res) {
        try {
            const { files, body: { service = '' } } = req;
            if (!files || Object.keys(files).length === 0) {
                return responseHandler.errorResponse(res, {}, 'No files were uploaded.', 400);
            }

            if (!service) {
                return responseHandler.errorResponse(res, {}, 'Service field is required', 400);
            }

            const fileUploads = Array.isArray(files.media) ? files.media : [files.media];
            const uploadedFiles = await Promise.all(fileUploads.map(async (file) => {
                const fileType = getFileType(file.mimetype.split('/')[1]);
                if (fileType === 'unsupported') {
                    return responseHandler.errorResponse(res, {}, `File type "${file.mimetype}" is not supported.`, 400);
                }

                const name = `${file.md5}${Date.now()}.${file.name.split(".").pop()}`;
                const imageFolderName = new Date().valueOf();
                const uploadPath = `/var/www/html/${process.env.UPLOADS_PATH}/${service}/${imageFolderName}/${name}`;

                await file.mv(uploadPath);

                const url = `http://${process.env.MONGODB_HOST}/${process.env.UPLOADS_PATH}/${service}/${imageFolderName}/${name}`;
                await storeFile(url, fileType, service);

                return { name: file.name, url };
            }));

            return responseHandler.successResponse(res, uploadedFiles, 'Files uploaded successfully');
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
}

const getFileType = (extension) => {
    let fileType = '';
    switch (extension) {
        case 'jpg':
        case 'png':
        case 'jpeg':
        case 'gif':
        case 'heic':
            fileType = 'image';
            break;
        case 'mp3':
        case 'wav':
        case 'wave':
        case 'x-wav':
        case 'x-m4a':
            fileType = 'audio';
            break;
        case 'mp4':
        case 'mov':
        case 'MOV':
            fileType = 'video';
            break;
        case 'pdf':
        case 'doc':
        case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'msword':
            fileType = 'file';
            break;
        default:
            fileType = 'unsupported';
            break;
    }
    return fileType;
};

const storeFile = async (file, fileType, service) => {
    const fileModel = new File({ file, file_type: fileType, service_type: service });
    return await fileModel.save();
};

export default new FileUpload();
