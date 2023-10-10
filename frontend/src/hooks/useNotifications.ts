import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks";
import { NOTIFICATIONS_SSE_ENDPOINT, loadNotifications } from "../services/notification";
import useSSE from "./useSSE";
import { NotificationData, Notification } from "../types";

const useNotifications = () => {
    const { token } = useAuth();
    const queryClient = useQueryClient();
    
    const { data } = useQuery<NotificationData>({
        queryFn: () => loadNotifications(token),
        queryKey: ["notifications", token],
        refetchInterval: false,
        refetchOnWindowFocus: false,
    })

    const source = useSSE(NOTIFICATIONS_SSE_ENDPOINT);

    source.onmessage = (event) => {
        const newEvent = JSON.parse(event.data) as Notification;
        
        if(!newEvent.type) {
            return;
        } 

        const existing = queryClient.getQueryData<NotificationData>(["notifications", token]);
        const existingNotifications = existing?.data ?? [];
        const res = { ...existing, data: [{ ...newEvent, status: "UNREAD" }, ...existingNotifications]};

        queryClient.setQueryData(["notifications", token], res);
    }

    source.onerror = (err) => {
        console.error(err);
    }

    return {
        page: data?.page,
        perPage: data?.perPage,
        data: data?.data
    }
}

export { useNotifications };
export default useNotifications;