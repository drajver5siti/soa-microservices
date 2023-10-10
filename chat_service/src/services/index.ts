import { Event } from "../types/message.js";
import { createChat, loadChats, sendChatMessage } from "./chats.js";

export const messageHandler = (event: Event) => {
    switch(event.type) {
        case 'chat_create': 
            return createChat(event);
        case 'chat_load':
            return loadChats(event);
        case 'message_send':
            return sendChatMessage(event);
    }
}