import jwt from 'jsonwebtoken';

const accessTokenKey = "superSecretKey";

export type AccessTokenPayload = {
    id: number,
    username: string
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, accessTokenKey) as AccessTokenPayload;
}