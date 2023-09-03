import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db.js";

export interface NotificationModel extends Model<InferAttributes<NotificationModel>, InferCreationAttributes<NotificationModel>> {
    id: CreationOptional<number>,
    type: string,
    message: string
}

const Notifications = db.define<NotificationModel>('Notifications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: DataTypes.STRING,
    message: DataTypes.TEXT,
});

type NotificationStatus = "READ" | "UNREAD"

export interface UserNotificationModel extends Model<InferAttributes<UserNotificationModel>, InferCreationAttributes<UserNotificationModel>> {
    userId: number,
    notificationId: number,
    status: NotificationStatus
}

const UserNotifications = db.define<UserNotificationModel>("UserNotifications", {
    userId: DataTypes.INTEGER,
    notificationId: DataTypes.INTEGER,
    status: DataTypes.STRING
})

export { 
    Notifications, 
    UserNotifications
};