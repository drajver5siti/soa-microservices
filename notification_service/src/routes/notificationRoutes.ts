import express, { Request, Response } from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.send("Test");
})

export default router;