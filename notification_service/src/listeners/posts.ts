import { Notifications, UserNotifications } from "../models/Notification.js";
import { dispatch } from "../notificationsDispatcher.js";

type PostCreated = {
    type: "post_created",
    id: number,
    author: number,
    [key: string]: any
}

type PostDeleted = {
    type: "post_deleted",
    id: number,
}

type PostMessage = PostCreated | PostDeleted;

export const handlePostMessage = async (data: PostMessage) => {
    if(data.type === "post_created") {
        const notification = await Notifications.create({
            type: data.type,
            message: `${'Ivan'} just published a new post, check it out !`
        })

        await UserNotifications.create({
            userId: data.author,
            notificationId: notification.id,
            status: "UNREAD"
        })

        // notification.setDataValue("status", "UNREAD");

        dispatch([{ id: data.author }], notification);
        
    } else if(data.type === "post_deleted") {

        // Find all notifications that are related to this post_id and delete them.
        // retry is not working
        // subscribe is sending token as query  

        await Notifications.destroy({ where: { id: data.id }});
        await UserNotifications.destroy({ where: { notificationId: data.id }});
    } else {}
}