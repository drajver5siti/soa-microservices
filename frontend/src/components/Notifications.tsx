import React from "react";
import DropdownList, { DropdownListItem } from "./DropdownList";
import { FaBell, FaRegClock } from "react-icons/fa";
import { useNotifications } from "../hooks";
import { Notification } from "../types";
import Time from "./Time";

const renderNotification = (notification: Notification): DropdownListItem => {
    return {
        name: notification.message,
        onClick: () => null,
        render: () => (
            <>
                <p className="text-left">
                    {notification.message}
                </p>
                <div className="flex items-center gap-x-2">
                    <FaRegClock className="text-xs" />
                    <Time className="text-light-color text-sm" timestamp={notification.createdAt} />
                </div>
            </>
        )
    }
}

const Notifications = () => {
    const { data } = useNotifications();

    // const unseenNotifications = data?.some(n => n.status === "UNREAD");
    const unseenNotifications = false;

    return (
        <div className="relative z-20">
            <DropdownList
                className="w-72 right-0"
                icon={
                    <div className="relative">
                        {
                            unseenNotifications &&
                            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                        }
                        <FaBell className="text-light-color" />
                    </div>
                }
                items={data?.map(x => renderNotification(x)) ?? []}
            />
        </div>
    )
}

export { Notifications };
export default Notifications;