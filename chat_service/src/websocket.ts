import ws, { WebSocketServer } from 'ws';
import { AccessTokenPayload, verifyAccessToken } from './helpers/index.js';
import { IncomingMessage } from 'http';
import { messageHandler } from './services/index.js';
import { Event, Recipient } from './types/message.js';

type Metadata = {
    user: AccessTokenPayload
}

const clients = new Map<ws, Metadata>();

const establishInitialConnection = (ws: ws, req: IncomingMessage) => {
    const url = new URL(req.url ?? "", `http://${req.headers.host}`);

    const token = url.searchParams.get("token") ?? "";

    let user = null;

    try {
        user = verifyAccessToken(token);
    } catch(err) {
        return req.destroy(new Error("Invalid token!"));
    }

    const metadata = { 
        user
    }

    clients.set(ws, metadata);

    ws.on("message", (data) => {
        const user = clients.get(ws);
        const event = JSON.parse(data.toString());
        event.user = user?.user;

        messageHandler(event);
    });

    ws.on('close', () => clients.delete(ws))
}

export const sendMessage = (
    recipients: Recipient[], 
    message: Event
) => {
    clients.forEach((value, ws) => {
        if(recipients.some(r => r.id === value.user.id)) {
            ws.send(JSON.stringify(message))
        }
    })
}

export const initWS = () => {
    const wss = new WebSocketServer({ port: 6666 });
    wss.on('connection', establishInitialConnection);
}