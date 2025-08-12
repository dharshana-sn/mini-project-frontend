import { useState } from "react";
import API from "../src/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
        alert("All fields are required.");
        return;
    }
    try {
        const { data } = await API.post("/auth/signup", { name, email, password });
        localStorage.setItem("token", data.token);
        navigate("/workspaces");
    } catch (err) {
        alert(err.response?.data?.message || "Signup failed.");
        console.error(err);
    }
};

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-80">
                <h2 className="text-xl font-bold mb-4">Signup</h2>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"
                    className="border p-2 w-full mb-2" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                    className="border p-2 w-full mb-2" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" className="border p-2 w-full mb-4" />
                <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Signup</button>
            </form>
        </div>
    );
}
