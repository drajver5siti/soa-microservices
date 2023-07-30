import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

// TODO: rework this
const excludedPaths = [
    "/users/login",
    "/users/login/",
    
    "/users/register",
    "/users/register/"
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
        jwt.verify(token, "superSecretKey");
        return next();
    } catch(err) {
        return res.send({ error: "Invalid token!" });
    }
}