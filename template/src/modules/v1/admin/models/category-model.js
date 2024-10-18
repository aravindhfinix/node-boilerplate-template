import { Schema, model } from 'mongoose';

/**
 * CategorySchema
 * @description Category model
 */

const CategorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'name must not be empty'],
    },
    image: {
        type: String,
    },
    status: {
        type: Number,
        default: 1
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


export const Category = model('category', CategorySchema);