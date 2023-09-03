import { API_PREFIX, calculateHeaders } from ".."
import { NotificationData } from "../../types";

export const NOTIFICATIONS_SSE_ENDPOINT = `${API_PREFIX}/notifications/subscribe`;

export const loadNotifications = async (token: string): Promise<NotificationData> => {
    try {
        const response = await fetch(`${API_PREFIX}/notifications/`, {
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