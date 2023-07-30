import express, { Request, Response } from "express";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {

    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ error: "Invalid data!" });
    }

    const user = await User.findOne({ where: { username }});

    if(!user) {
        return res.status(400).json({ error: 'Invalid credentials!' });
    }

    if(!bcrypt.compareSync(password, user.password)) {
        return res.json({ error: 'Invalid credentials'});
    }

    const jwtSign = jwt.sign({ username, id: user.id }, "superSecretKey");

    return res.json({ token: jwtSign });
})

export default router;