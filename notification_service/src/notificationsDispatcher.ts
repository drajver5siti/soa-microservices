import { Response } from "express";
import { NotificationModel } from "./models/Notification.js";

type Client = {
    id: number,
    res: Response
}

let subscribedClients: Client[] = [];

export const subscribe = (client: Client, res: Response) => {
    if(!subscribedClients.some(x => x.id === client.id)) {
        subscribedClients.push(client);
    }
}

export const unsubscribe = (client: Client) => {
    subscribedClients = subscribedClients.filter((x) => x.id !== client.id)
}

type Recipient = {
    id: number
}

export const dispatch = (recipients: Recipient[], notification: NotificationModel) => {
    
    const message = `data: ${JSON.stringify({ 
        id: notification.id, 
        type: notification.type,
        message: notification.message,
        createdAt: notification.createdAt,
        
    })}\n\n`;

    subscribedClients
        .filter(c => recipients.some((r) => r.id === c.id))
        .forEach(c => {
            c.res.write(message)
        });
}