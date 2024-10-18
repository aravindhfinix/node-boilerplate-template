import { Schema, model } from 'mongoose';

// Define a Mongoose schema for the log data
const ApiLogSchema = new Schema({
    request_user_agent: String,
    request_host: String,
    method: String,
    request_url: String,
    type: Number,
    status_message: String,
    content_length: String,
    requested_at: String,
    remote_address: String,
    request_ip: String,
    process_time: String,
    request_body: Object,
    response_message: String,
    user_id: String,
    session: String,
    protocol: String,
    status: {
        type: Number,
        default: 1
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Create a Mongoose model using the schema
export const ApiLog = model('api-log', ApiLogSchema);
