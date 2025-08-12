import { useEffect, useState } from "react";
import API from "../src/api";
import { useNavigate } from "react-router-dom";

export default function Workspaces() {
    const [workspaces, setWorkspaces] = useState([]);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => { fetchWorkspaces(); }, []);

    const fetchWorkspaces = async () => {
        const { data } = await API.get("/workspaces");
        setWorkspaces(data);
    };

    const createWorkspace = async () => {
        if (!name.trim()) return;
        try {
            await API.post("/workspaces", { name });
            setName("");
            fetchWorkspaces();
        } catch (err) {
            if (err.response?.status === 401) {
                alert("Session expired. Please log in again.");
                navigate("/login");
            } else {
                alert(err.response?.data?.message || "Failed to create workspace.");
            }
            console.error(err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Workspaces</h1>
            <div className="flex gap-2 mb-4">
                <input value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="New workspace" className="border p-2" />
                <button onClick={createWorkspace} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
            </div>
            <ul>
                {workspaces.map(w => (
                    <li key={w._id} onClick={() => navigate(`/boards/${w._id}`)}
                        className="cursor-pointer p-2 border-b">{w.name}</li>
                ))}
            </ul>
        </div>
    );
}
