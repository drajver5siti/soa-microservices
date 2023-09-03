import { useEffect, useState } from "react";
import { useAuth } from "./useAuth"

const useSSE = (url: string) => {
    const [src, setSrc] = useState({} as EventSource);
    const { token } = useAuth();

    useEffect(() => {
        const eventSource = new EventSource(`${url}?token=${token}`, { withCredentials: true });
        setSrc(eventSource);

        return () => {
            eventSource.close();
        }
    }, [url]);

    return src;
}

export { useSSE };
export default useSSE;