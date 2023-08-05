import React from "react";
import { AuthContext } from "../contexts/user";

export const useAuth = () => React.useContext(AuthContext);