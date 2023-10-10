import express, { Request, Response } from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/friends", async (req: Request, res: Response) => {
    const users = await User.findAll();

    return res.json(users);
})

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: ['id', 'username']});
        return res.json(user);
    } catch(err) {
        return res.status(400).json({ message: "Invalid user" });
    }

})

router.get("/", async (req: Request, res: Response) => {
    const users = await User.findAll({ attributes: ['id', 'username', 'createdAt']});

    return res.send(users);
}) 

export default router;