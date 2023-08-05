import jwt from 'jwt-decode';
import { API_PREFIX, calculateHeaders, defaultHeaders } from '..';
import { User } from '../../types';


export const load = async (token: string) => {
    const user = jwt<User>(token);

    try {
        const response = await fetch(`${API_PREFIX}/users/${user.id}`, {
            headers: calculateHeaders(token),
        })
    
        const data = await response.json();

        if(!response.ok) {
            throw data;
        }
    
        return data;
    } catch(err) {
        throw err;
    }
}

export const login = async ({ username, password }) => {
    try {
        const response = await fetch(`${API_PREFIX}/users/login`, {
            headers: defaultHeaders,
            body: JSON.stringify({username, password}),
            method: 'POST'
        })
    
        const data = await response.json();

        if(!response.ok) {
            throw data;
        }
    
        return data;
    } catch(err) {
        throw err;
    }
}

export const logout = async () => {
    try {
        const response = await fetch(`${API_PREFIX}/users/logout`, {
            headers: defaultHeaders,
            method: 'POST'
        })
    
        const data = await response.json();

        if(!response.ok) {
            throw data;
        }
    
        return data;
    } catch(err) {
        throw err;
    }
}

export const refreshToken = async () => {
    try {
        const response = await fetch(`${API_PREFIX}/users/refresh`, {
            headers: defaultHeaders,
            method: 'POST'
        })

        const data = await response.json();

        if(!response.ok) {
            throw data;
        }

        return data;
    } catch(err) {
        throw err;
    }
}