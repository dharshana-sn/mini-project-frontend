import { useEffect, useState } from "react";
import API from "../src/api";
import { useParams } from "react-router-dom";

export default function Lists() {
    const { boardId } = useParams();
    const [lists, setLists] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => { fetchLists(); }, []);

    const fetchLists = async () => {
        const { data } = await API.get(`/lists/${boardId}`);
        setLists(data);
    };

    const createList = async () => {
        await API.post("/lists", { title, boardId });
        setTitle("");
        fetchLists();
    };

    return (
        <div className="p-6 flex gap-4 overflow-x-auto">
            {lists.map(l => (
                <div key={l._id} className="bg-gray-100 p-4 rounded w-60">
                    <h2 className="font-bold mb-2">{l.title}</h2>
                    <ListCards listId={l._id} />
                </div>
            ))}
            <div className="bg-gray-200 p-4 rounded w-60">
                <input value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder="New list" className="border p-2 w-full mb-2" />
                <button onClick={createList} className="bg-blue-500 text-white px-2 py-1 rounded w-full">Add List</button>
            </div>
        </div>
    );
}

function ListCards({ listId }) {
    const [cards, setCards] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => { fetchCards(); }, []);

    const fetchCards = async () => {
        const { data } = await API.get(`/cards/${listId}`);
        setCards(data);
    };

    const createCard = async () => {
        await API.post("/cards", { title, listId });
        setTitle("");
        fetchCards();
    };

    return (
        <div>
            {cards.map(c => (
                <div key={c._id} className="bg-white p-2 rounded mb-2 shadow">{c.title}</div>
            ))}
            <input value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="New card" className="border p-1 w-full mb-1" />
            <button onClick={createCard} className="bg-green-500 text-white px-2 py-1 rounded w-full">Add Card</button>
        </div>
    );
}
