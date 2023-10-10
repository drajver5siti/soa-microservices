import { API_PREFIX, calculateHeaders } from "..";

export const loadChats = async (token: string) => {
    try {
        const response = await fetch(`${API_PREFIX}/chat/`, {
            headers: calculateHeaders(token)
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
