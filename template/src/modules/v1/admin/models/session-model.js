import { Schema, model } from "mongoose";
const { ObjectId } = Schema;

/**
 * User schema
 */

const SessionSchema = new Schema({

    user_id: {
        type: ObjectId,
        required: true
    },
    session_token: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export const Session = model('session', SessionSchema);