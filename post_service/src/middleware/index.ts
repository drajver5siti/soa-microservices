import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from '../helpers/index.js';

// TODO: rework this
const excludedPaths: string[] = [
];

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    if(excludedPaths.some(p => p === req.path)) {
        return next();
    }

    const token = req.headers?.authorization?.split(" ")?.[1];

    if(!token) {
        return res.status(401).json({ message: "No API token provided!" });
    }

    try {
        verifyAccessToken(token);
        return next();
    } catch(err) {
        return res.status(400).json({ message: "Invalid token!" });
    }
}