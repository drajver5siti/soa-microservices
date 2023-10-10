import React from "react";
import { useUser } from "../hooks";

const Profile = () => {
    const user  = useUser();

    return (
        <div className="mx-auto">
            <h1 className="text-light-color text-3xl">
                Hello, <span className="font-extrabold italic">{user.username}</span>
            </h1>
        </div>
    )
}

export { Profile };
export default Profile;