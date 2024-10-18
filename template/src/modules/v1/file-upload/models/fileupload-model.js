import { Schema, model } from 'mongoose';

/**
 * File Upload Schema
 * @description FileUpload model
 */
const FileUploadSchema = new Schema({

    file: {
        type: String,
        required: true
    },
    file_type: {
        type: String,
        required: true
    },
    service_type: {
        type: String,
        required: true
    },
    resized_image: {
        type: Array
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


export const File = model('File', FileUploadSchema);