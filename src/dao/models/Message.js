import mongoose from "mongoose";

const collection = 'Messages';

const schema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const messageModel = mongoose.model(collection, schema);

export default messageModel;
