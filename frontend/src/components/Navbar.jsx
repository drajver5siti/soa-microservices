import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

    const [isLoggedIn] = useState(() => localStorage.getItem("jwt"));

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
                <li className="text-light-color ml-auto">
                    {
                        isLoggedIn 
                        ? (
                            <Link onClick={() => localStorage.removeItem("jwt")}>
                                Logout
                            </Link>
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