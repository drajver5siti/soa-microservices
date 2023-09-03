import React from "react";
import useFriends from "../hooks/useFriends"
import { Friend } from "../types";
import DropdownList, { DropdownListItem } from "./DropdownList"
import { FaUsers } from "react-icons/fa";

const renderFriend = (friend: Friend): DropdownListItem => {
    return {
        name: friend.id.toString(),
        onClick: () => null,
        render: () => (
            <p>{friend.username}</p>
        )
    }
}

const Friends = () => {

    const friends = useFriends();

    return (
        <div className="relative z-20">
            <DropdownList
                className="right-0"
                icon={<FaUsers className="text-light-color" />}
                items={friends?.map(renderFriend) ?? []}
            />
        </div>
    )
}

export { Friends };
export default Friends;