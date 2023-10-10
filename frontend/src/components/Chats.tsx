import React from "react";
import DropdownList, { DropdownListItem } from "./DropdownList"
import { FaComment } from "react-icons/fa";
import { Chat as ChatType} from "../types";
import Chat from "./Chat";
import { useChatContext, useFriends, useUser } from "../hooks";



const Chats = () => {
    const { openedChat, setOpenedChat, chats, sendMessage } = useChatContext();
    const user = useUser();
    const friends = useFriends();

    const getChatTitle = (chat: ChatType) => {
        let chatTitle = chat.title;
        if(chat.type === "group_chat" && !chatTitle) {
            chatTitle = "Group Chat"
        } else if(chat.type === "single_chat") {
            const friendId = chat.participants.find(p => p.id !== user.id)?.id;
            const friend = friends?.find(f => f.id === friendId);
            if(friend) {
                chatTitle = "Chat with " + friend?.username;
            }
        }
    
        return chatTitle;
    }
    
    const renderChat = (chat: ChatType): DropdownListItem => {
        return {
            name: chat._id,
            onClick: () => setOpenedChat(chat),
            render: () => {
                return (
                    <p className="text-left">{getChatTitle(chat)}</p>
                )
            }
        }
    }

    return (
        <div className="relative z-20">
            <DropdownList
                className="right-0 w-max"
                icon={<FaComment className="text-light-color" />}
                items={chats?.map(renderChat) ?? []}
            />
            {
                openedChat &&
                <Chat 
                    customChatTitle={getChatTitle(openedChat)}
                    chat={openedChat}
                    onSendMessage={(message) => sendMessage(openedChat._id, message)}
                    onCloseChat={() => setOpenedChat(null)}
                />
            }
        </div>
    )
}

export { Chats };
export default Chats;