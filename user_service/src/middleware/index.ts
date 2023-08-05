import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from '../helpers/index.js';

// TODO: rework this
const excludedPaths = [
    "/api/users/login",
    "/api/users/login/",

    "/api/users/logout",
    "/api/users/logout/",

    "/api/users/refresh",
    "/api/users/refresh/",

    "/api/users/register",
    "/api/users/register/"
];

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    if(excludedPaths.some(p => p === req.path)) {
        return next();
    }

    const token = req.headers?.authorization?.split(" ")?.[1];

    if(!token) {
        return res.status(401).json();
    }

    try {
        verifyAccessToken(token);
        return next();
    } catch(err) {
        return res.send({ error: "Invalid token!" });
    }
}