import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth"
import { User } from "../types";
import { loadFriends } from "../services/user";

const useFriends = () => {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data } = useQuery<User[]>({
        queryFn: () => loadFriends(token),
        queryKey: ["friends", token],
        refetchInterval: false,
        refetchOnWindowFocus: false
    })

    return data;
}

export { useFriends };
export default useFriends;