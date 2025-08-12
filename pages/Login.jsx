import { useState } from "react";
import API from "../src/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try{  e.preventDefault();
        const { data } = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        console.log(localStorage);
        navigate("/workspaces");}catch(err){
             alert(err.response?.data?.message || "Login failed.");
        console.error(err);
        }
      
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-80">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                    className="border p-2 w-full mb-2" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" className="border p-2 w-full mb-4" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
            </form>
        </div>
    );
}
