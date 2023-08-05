import React from "react";
import { createContext, useState } from "react"
import { User } from "../types"
import { parseUserFromToken } from "../helpers";
import { useLocation, useNavigate } from "react-router";

type AuthContextType = {
    user: User | null,
    login: (token: string) => void,
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({ user: null, login: () => {}, logout: () => {}});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (token: string) => {
        setUser(parseUserFromToken(token));

        const redirectPath = location.state?.from?.pathname || '/';
        const redirectQuery = location.state?.from?.search || "";

        navigate({ pathname: redirectPath, search: redirectQuery });
    }

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    }

    const value = {
        user,
        login: handleLogin,
        logout: handleLogout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export { AuthProvider as UserProvider };
export default AuthProvider;