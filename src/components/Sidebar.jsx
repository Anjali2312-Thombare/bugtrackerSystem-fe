// components/Sidebar.jsx
import { useNavigate } from "react-router-dom";

export default function Sidebar({ username, userId }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // or just remove token, username, userId
    navigate("/Signin");
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-yellow-400 p-6 flex flex-col justify-between">
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">Bug Tracker</h2>
          <p className="text-sm">Logged in as <span className="font-bold">{username}</span></p>
          <p className="text-sm">ID: {userId}</p>
        </div>

        <nav className="space-y-4">
          <button
            onClick={() => navigate("/projects")}
            className="block w-full text-left px-4 py-2 rounded hover:bg-yellow-600 hover:text-black transition"
          >
            🗂 My Projects
          </button>
          <button
            onClick={() => navigate("/bugs")}
            className="block w-full text-left px-4 py-2 rounded hover:bg-yellow-600 hover:text-black transition"
          >
            🐞 My Bugs
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="block w-full text-left px-4 py-2 rounded hover:bg-yellow-600 hover:text-black transition"
          >
            👤 Profile
          </button>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
