import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/user";
import Notifications from "./Notifications";
import Friends from "./Friends";

export const Navbar = () => {
    const { user, logout: logoutContext } = useAuth();

    const mutation = useMutation({
        mutationFn: logout,
        onSettled: () => {
            logoutContext();
        }
    })

    if(!user) {
        return <div></div>;
    }

    return (
        <nav className="flex flex-row items-center">
            <ul className="w-full flex flex-row text-xl px-4 py-2 items-center gap-6">
                <li className="text-light-color">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="text-light-color">
                    <Link to="/profile">
                        Profile
                    </Link>
                </li>
                <li className="ml-auto">
                    <Friends />
                </li>
                <li> 
                    <Notifications />
                </li>
                <li className="text-light-color">
                    {
                        user 
                        ? (
                            <button onClick={() => mutation.mutate()}>
                                Logout
                            </button>
                        ) : (
                            <Link to="/login">
                                Login
                            </Link>
                        )
                    }
                </li>
            </ul>
        </nav>        
    )
}

export default Navbar;