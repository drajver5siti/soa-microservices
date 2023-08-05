import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { Navigate, useLocation }from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { refreshToken } from "../services/user";

const ProtectedRoute = ({ children }) => {
    const [autoLoginTried, setAutoLoginTried] = useState(false);
    const { user, login } = useAuth();
    const location = useLocation();

    const mutation = useMutation({
        mutationFn: refreshToken,
        onSuccess: (data: { token: string }) => {
            login(data.token);
        },
        onSettled: () => {
            setAutoLoginTried(true);
        }
    })

    useEffect(() => {
        if(mutation.isIdle) {
            mutation.mutate();
        }
    }, []);

    if(!autoLoginTried) {
        return "Loading...";
    }

    if(!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return (
        children
    )
}

export { ProtectedRoute };