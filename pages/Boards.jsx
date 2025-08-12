import { useEffect, useState } from "react";
import API from "../src/api.js";
import { useParams, useNavigate } from "react-router-dom";

export default function Boards() {
    const { workspaceId } = useParams();
    const [boards, setBoards] = useState([]);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchBoards();
       
    }, [workspaceId]);

    const fetchBoards = async () => {
        try {
            const { data } = await API.get(`/boards/${workspaceId}`);
            setBoards(data);
        } catch (err) {
            console.error("Failed to fetch boards:", err);
        }
    };

    const createBoard = async () => {
        if (!title.trim()) return;
        try {
            await API.post("/boards", { title, workspaceId });
            setTitle("");
            fetchBoards();
        } catch (err) {
            console.error("Failed to create board:", err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Boards</h1>
            <div className="flex gap-2 mb-4">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New board"
                    className="border p-2"
                />
                <button
                    onClick={createBoard}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={!title.trim()}
                >
                    Add
                </button>
            </div>
            <ul>
                {boards.map((b) => (
                    <li
                        key={b._id}
                        onClick={() => navigate(`/lists/${b._id}`)}
                        className="cursor-pointer p-2 border-b"
                    >
                        {b.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
