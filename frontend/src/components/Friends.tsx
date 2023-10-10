import React, { useMemo } from "react";
import { FaComment, FaUsers } from "react-icons/fa";
import DropdownList from "./DropdownList";
import { useFriends, useUser, useChatContext }from "../hooks";
import { User } from "../types";

const Friends = () => {
    const friends = useFriends();
    const user = useUser();
    const { chats, createChat, setOpenedChat } = useChatContext();

    const handleOpenChatWithFriend = async (friend: User) => {
        let chat = chats.find((c) => c.type === "single_chat" && c.participants.some(p => p.id === friend.id))

        if(chat) {
            return setOpenedChat(chat);
        }

        // Sends a message through websocket, when chat is created the subscriber will auto open it
        createChat({
            title: null,
            participants: [{ id: friend.id }, { id: user.id }],
            chatType: "single_chat"
        })
    }

    const renderFriend = (friend: User) => {
        return {
            name: friend.username,
            onClick: () => handleOpenChatWithFriend(friend),
            render: () => (
                <div className="flex gap-2 items-center w-full">
                    <FaComment className="text-light-color text-sm"/>
                    <p className="text-left">{friend.username}</p>
                </div>
            )
        }
    }

    const mappedFriends = useMemo(() => {
        return friends?.filter(f => f.id !== user.id).map(renderFriend) ?? [];
    }, [friends, user])

    return (
        <DropdownList 
            className="w-max"
            icon={<FaUsers className="text-light-color" />}
            items={mappedFriends}
        />
    )
}

export { Friends };
export default Friends;