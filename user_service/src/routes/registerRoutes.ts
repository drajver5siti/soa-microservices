import express, { Request, Response } from 'express';
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    const { username, password } = req.body; 

    if(!username || !password) {
        return res.status(400).json({message: "Invalid data!" });
    }

    const userExists = !!await User.findOne({ where: { username } });

    if(userExists) {
        return res.status(400).json({ message: "Username already exists!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await User.create({ username, password: hashedPassword });

    return res.json();
})

export default router;