import { useAuth } from "./useAuth"

export const useUser = () => {
    const { user } = useAuth();

    if(!user) throw new Error("User must be logged in");

    return user;
}