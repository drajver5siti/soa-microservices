const getToken = () => localStorage.getItem("jwt");
import jwt from 'jwt-decode';

export const load = async () => {
    const user = jwt(getToken());

    try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
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
        const response = await fetch("http://localhost:3000/login", {
            headers: {
                'Content-Type': 'application/json',
            },
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