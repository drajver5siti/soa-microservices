import express, { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../helpers/index.js";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {

    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ message: "Invalid data!" });
    }

    const user = await User.findOne({ where: { username }});

    if(!user) {
        return res.status(400).json({ message: 'Invalid credentials!' });
    }

    if(!bcrypt.compareSync(password, user.password)) {
        return res.json({ message: 'Invalid credentials'});
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        // 2 days
        maxAge: 2 * 24 * 60 * 60 * 1000
    });

    return res.json({ token: accessToken });
})

// Clear the refreshToken cookie
// TODO: blacklist the refreshToken ?
router.post("/logout", async (req: Request, res: Response) => {
    res.clearCookie("refresh_token");
    return res.json({});
})

// Uses the http only refresh_token cookie and tries to return a new access token
router.post('/refresh', async (req: Request, res: Response) => {
    const doError = () => {
        res.clearCookie("jwt");
        return res.status(403).json({ message: "Invalid refresh token" });
    }

    const refreshToken = req.cookies?.refresh_token;

    if(!refreshToken) {
        return doError();
    }

    try {
        const payload = verifyRefreshToken(refreshToken);
        const user = await User.findOne({ where: { username: payload.username }});

        if(!user) {
            return doError();
        }

        const accessToken = signAccessToken(user);
        return res.json({ token: accessToken });
    } catch(err) {
        return doError();
    }
})

export default router;