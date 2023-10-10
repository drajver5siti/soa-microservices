import { randomUUID } from "crypto";
import mongoose, { InferSchemaType, Model, Schema } from "mongoose";

const messageSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: randomUUID()
    },
    content: {
        type: String,
        // required: true
    },
    userId: Number,
    
}, { timestamps: true })

const chatSchema = new Schema({
    _id: { 
        type: String,
        default: randomUUID()
    },
    title: {
        type: String,
        required: false,
    },
    participants: {
        type: [
            {
                id: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true,
    },
    messages: {
        type: [messageSchema]
    },
    type: {
        type: String,
        enum: ['single_chat', 'group_chat'],
        required: true
    }
}, { _id: false, timestamps: true });

type Chat = InferSchemaType<typeof chatSchema>;
type Message = InferSchemaType<typeof messageSchema>;
const ChatModel = mongoose.model("Chat", chatSchema);

export {
    Chat,
    Message,
    ChatModel
}