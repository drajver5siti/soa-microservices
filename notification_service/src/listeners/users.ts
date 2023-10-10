import { Notifications, UserNotifications } from "../models/Notification.js"
import { dispatch } from "../notificationsDispatcher.js"

type UserCreated = {
    type: "user_created"
    userId: number
}

type UserDeleted = {
    type: "user_deleted",
    userId: number,
    deletedAt: number 
}

type UserMessage = UserCreated | UserDeleted;

export const handleUserMessage = async (data: UserMessage) => {
    if(data.type === "user_created") {
        const notification = await Notifications.create({
            type: data.type,
            message: "Your account has been created, welcome !"
        });

        await UserNotifications.create({
            userId: data.userId,
            notificationId: notification.id,
            status: "UNREAD"
        })

        // notification.setDataValue("status", "UNREAD");
        
        dispatch([{ id: data.userId }], notification);

    } else if(data.type === "user_deleted") {

    } else {}
}