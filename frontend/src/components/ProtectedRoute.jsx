import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate();

    const token = localStorage.getItem("jwt");

    if(token === null) {
        return navigate("/login")
    }

    return (
        children
    )
}

export { ProtectedRoute };