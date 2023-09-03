import express, { Request, Response } from "express";
import { subscribe, unsubscribe } from "../notificationsDispatcher.js";
import { Notifications, UserNotifications } from "../models/Notification.js";

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {

    const userId = req.user.id as number;

    const notificationsForUser = await UserNotifications.findAll({ where: { userId: userId } })

    const notificationIds = notificationsForUser.map(n => n.notificationId);
    const notificationsStatus = notificationsForUser.map(n => ({ id: n.notificationId, status: n.status }))

    const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage.toString()) : 10;

    let notifications = await Notifications.findAll(
        {
            where: {
                id: notificationIds
            },
            limit: perPage,
            offset: (page - 1) * perPage,
            order: [['createdAt', 'DESC']]
        }
    );

    return res.json({
        page,
        perPage,
        data: notifications
    })
})

router.get('/subscribe', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('transfer-encoding', 'chunked');

    res.write(`data: {}\n\n`);

    const clientId = req.user.id;

    const client = {
        id: clientId,
        res
    }

    subscribe(client, res);
    req.on('close', () => unsubscribe(client));
})

export default router;