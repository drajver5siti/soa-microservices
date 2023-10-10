import React, { createContext } from "react";
import { CreateChatProps, useChat } from "../hooks";
import { Chat } from "../types";

type ChatContextType = {
    chats: Chat[],
    openedChat: Chat | null,
    setOpenedChat: (chat: Chat | null) => void,
    createChat: ({ title, participants, chatType}: CreateChatProps) => void,
    sendMessage: (chatId: string, message: string) => void
}

export const ChatContext = createContext<ChatContextType>({
    chats: [],
    openedChat: null,
    setOpenedChat: () => null,
    createChat: () => null,
    sendMessage: () => null
});

const ChatProvider = ({ children }) => {

    const chat = useChat();

    return (
        <ChatContext.Provider value={chat}>
            {children}
        </ChatContext.Provider>
    )
}

export { ChatProvider };
export default ChatProvider;