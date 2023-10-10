import jwt from 'jsonwebtoken';

const accessTokenKey = "superSecretKey";
const apiPrefix = 'http://api_gateway/api';

export type AccessTokenPayload = {
    id: number,
    username: string
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, accessTokenKey) as AccessTokenPayload;
}

export const internal = async (query: string, token: string) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const res = await fetch(`${apiPrefix}${query}`, { headers });
    const data = await res.json();

    return data;
}