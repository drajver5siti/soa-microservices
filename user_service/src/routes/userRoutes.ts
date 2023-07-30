import express, { Request, Response } from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id);

    return res.json(user);
})

router.get("/", async (req: Request, res: Response) => {
    const users = await User.findAll();

    return res.send(users);
}) 

export default router;