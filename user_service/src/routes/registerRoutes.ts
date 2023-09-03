import express, { Request, Response } from 'express';
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { publishMessage } from '../rabbitmq.js';

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

    const user = await User.create({ username, password: hashedPassword });

    publishMessage(
        "users", 
        { 
            type: 'user_created', 
            userId: user.id, 
        }
    ); 

    return res.json();
})

export default router;