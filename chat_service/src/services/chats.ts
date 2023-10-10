import { randomUUID } from "crypto";
import { ChatModel } from "../models/index.js";
import { CreateChatEvent, LoadChats, SendMessageEvent } from "../types/message.js";
import { sendMessage } from "../websocket.js";

export const createChat = async (event: CreateChatEvent) => {
    const chat = new ChatModel({ 
        _id: randomUUID(), 
        title: event.title, 
        participants: event.participants,
        type: event.chatType
    });

    await chat.save();
    sendMessage(chat.participants, { type: "chat_created", chat });
}

export const loadChats = async (event: LoadChats) => {
    let chats = (await ChatModel.find({ participants: { $elemMatch: { id: event.user.id }}}));

    sendMessage([{ id: event.user.id }], { type: "chat_loaded", chats })
}

export const sendChatMessage = async (event: SendMessageEvent) => {
    const chat = await ChatModel.findById(event.chatId);

    if(!chat) {
        return;
    }

    const newMessageID = randomUUID();
    chat.messages.push({ _id: newMessageID, content: event.content, userId: event.user.id });
    chat.save();

    const newMessage = chat.messages.find(m => m._id === newMessageID);

    if(!newMessage) {
        return;
    }

    sendMessage(
        chat.participants, 
        { 
            type: "message_receive", 
            chatId: chat._id,  
            message: newMessage 
        }
    );
}