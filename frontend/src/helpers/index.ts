import jwtDecode from "jwt-decode";
import { User } from "../types";

export const parseUserFromToken = (token: string): User => {
    return jwtDecode(token);
}