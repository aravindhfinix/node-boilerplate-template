import { Schema, model } from 'mongoose';


/**
 * UserSchema
 * @description User model
 */

const UserSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name must not be empty'],
    },
    email: {
        type: String,
        required: [true, 'email must not be empty'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password must not be empty'],
    },
    kyc_document: {
        type: Array,
        required: true
    },
    phone_number: {
        type: String,
        required: [true, 'phone_number must not be empty'],
        unique: true
    },
    is_private: {
        type: Boolean,
        default: false
    },
    kyc_verified: {
        type: Number,
        default: 0
    },
    email_verified: {
        type: Number,
        default: 0
    },
    reset_token: String,
    token_expires: String,
    status: {
        type: Number,
        default: 1
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


export const User = model('user', UserSchema);