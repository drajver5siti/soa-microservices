import React from "react";
import { useUser } from "../hooks";

const Profile = () => {
    const user  = useUser();

    return (
        <div>
            Hello, {user.id}
        </div>
    )
}

export { Profile };
export default Profile;