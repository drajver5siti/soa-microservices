import { useState } from "react";
import { useAuth } from "../hooks"
import useWebSocket from "react-use-websocket";
import { Chat } from "../types";

export type CreateChatProps = {
    title: string | null,
    participants: { id: number }[],
    chatType: "single_chat" | "group_chat"
}


const useChat = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [openedChat, setOpenedChat] = useState<Chat | null>(null);
    const { token, user } = useAuth();

    const { sendJsonMessage } = useWebSocket(
        `ws://localhost/ws/chat/?token=${token}`, 
        {
            onOpen: (e) => {
                sendJsonMessage({ type: "chat_load" })
            },
            onMessage: (e) => {
                const event = JSON.parse(e.data);
                if(event.type === "chat_loaded") {
                    setChats(event.chats);
                }
                else if(event.type === "chat_created") {
                    setChats((prev) => [...prev, event.chat])
                    setOpenedChat(event.chat)
                }
                else if(event.type === "message_receive") {
                    const modifiedChat = chats.find((c) => c._id === event.chatId);
                    if(modifiedChat) {
                        const existingChats = chats.filter((c) => c._id !== event.chatId);
                        modifiedChat.messages.push(event.message);
                        setChats([...existingChats, modifiedChat]);
                    }
                }
            },
            onError: (e) => {
                console.log("Error ", e)
            }
        }
    )

    const createChat = ({ title = null, participants, chatType }: CreateChatProps) => {
        return sendJsonMessage({ type: "chat_create", title, participants, chatType });
    }

    const addParticipantToChat = (participantId: number, chatId: string) => {

    }

    const sendMessage = (chatId: string, content: string) => {
        return sendJsonMessage({ type: "message_send", chatId, content})
    }

    return {
        chats,
        openedChat,
        setOpenedChat,
        createChat,
        sendMessage,
    }
}

export { useChat };
export default useChat;