import { AccessTokenPayload } from "../helpers/index.js"
import { Chat, Message } from "../models/index.js"

export type Recipient = {
    id: number
}

export type Participant = {
    id: number
}

export type SendMessageEvent = {
    type: 'message_send',
    chatId: string,
    user: AccessTokenPayload,
    content: string
}

export type ReceiveMessageEvent = {
    type: 'message_receive',
    chatId: string,
    message: Message
}

export type LoadChats = {
    type: 'chat_load'
    user: AccessTokenPayload
}

export type ChatLoaded = {
    type: 'chat_loaded',
    chats: Chat[]
}

export type CreateChatEvent = {
    type: 'chat_create',
    participants: Participant[],
    title: string,
    user: AccessTokenPayload,
    chatType: "single_chat" | "group_chat"
}

export type ChatCreatedEvent = {
    type: 'chat_created',
    chat: Chat
}

export type WSAddToChatEvent = {
    type: 'chat_add',
    userId: number,
    chat: Chat
}

export type WSRemoveFromChatEvent = {
    type: 'chat_remove',
    userId: number,
    chat: Chat
}

export type MessageEvent =
    SendMessageEvent
    | ReceiveMessageEvent;

export type ChatEvent = 
    LoadChats
    | ChatLoaded
    | CreateChatEvent 
    | ChatCreatedEvent

export type Event = ChatEvent | MessageEvent;