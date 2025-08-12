import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Workspaces from "../pages/Workspace";
import Boards from "../pages/Boards";
import Lists from "../pages/Lists";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/boards/:workspaceId" element={<Boards />} />
        <Route path="/lists/:boardId" element={<Lists />} />
      </Routes>
    </Router>
  );
}
