import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useUser } from "./useUser";

type Props = {
    host: string,
    port: number,
    searchParams: URLSearchParams,
    onOpen: (event: Event) => any | null,
    onMessage: (event: MessageEvent) => any | null
}

const useWebSocket = ({
    host,
    port = 80, 
    searchParams = new URLSearchParams(),
    onOpen,
    onMessage
}: Props) => {
    const { token } = useAuth();
    const user = useUser();

    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        if(socket) {
            socket.onopen = onOpen;
            socket.onmessage = onMessage;
        }
    }, [socket])

    useEffect(() => {
        const url = new URLSearchParams({ ...Object.fromEntries(searchParams)});
        url.append("token", token);
        url.append("userId", user.id.toString());

        setSocket(new WebSocket(`ws://${host}:${port}?${url.toString()}`))

        return () => {
            if(socket) {
                socket.close();
            }
        }
    }, []);

    return {
        sendMessage: () => socket?.send("Test message")
    }
}

export { useWebSocket };
export default useWebSocket;