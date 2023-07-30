import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login, } from "../services/user";
import { useNavigate } from "react-router";

const Login = () => {
    const [data, setData] = useState({ username: "", password: "" });

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem("jwt", data.token);
            navigate("/profile");
        },
    })

    return (
        <main className="grid items-start h-full text-light-color text-md">
            <div className="w-1/2 mx-auto mt-12 border border-light-color bg-accent-1-color h-auto flex flex-col items-center pt-5 pb-5 gap-5">
                <label className="flex flex-col w-4/6 gap-1">
                    Username:
                    <input 
                        className="text-primary-color"
                        value={data.username} 
                        onChange={(e) => setData((prev) => ({ ...prev, username: e.target.value }))}
                    />
                </label>
                <label className="flex flex-col w-4/6 gap-1">
                    Password:
                    <input 
                        className="text-primary-color"
                        value={data.password} 
                        onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))} 
                    />  
                </label>

                <button className="bg-light-color text-primary-color font-bold px-8 py-2 rounded-sm" onClick={() => mutation.mutate({ username: data.username, password: data.password })}>Submit</button>
            </div>
        </main>
    )
}

export { Login };
export default Login;