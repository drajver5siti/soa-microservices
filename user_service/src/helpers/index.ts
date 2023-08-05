import jwt from 'jsonwebtoken';
import { UserModel } from "../models/User.js";

const accessTokenKey = "superSecretKey";
const refreshTokenKey = "superSecretRefreshTokenKey";

export type AccessTokenPayload = {
    id: number,
    username: string
}

export type RefreshTokenPayload = {
    username: string
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, accessTokenKey) as AccessTokenPayload;
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, refreshTokenKey) as RefreshTokenPayload;
}

export const signAccessToken = (user: UserModel) => {
    return jwt.sign({ username: user.username, id: user.id }, accessTokenKey, { expiresIn: '10m' });
}

export const signRefreshToken = (user: UserModel) => {
    return jwt.sign({ username: user.username }, refreshTokenKey, { expiresIn: '2d' });
}