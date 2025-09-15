import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import BugCard from "../components/BugCard";
import BugModal from "../components/BugModal";
import EditBugModal from "../components/EditBugModal";

const DeleteModal = ({ isOpen, onClose, onConfirm, bugTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-black text-yellow-300 border border-yellow-600 rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">Are you sure you want to delete the bug "{bugTitle}"?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-yellow-500 text-yellow-400 rounded hover:bg-yellow-600 hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-black font-semibold rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export function Bugs() {
  const [isBugModalOpen, setIsBugModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bugs, setBugs] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [selectedBug, setSelectedBug] = useState(null);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.state?.projectId;

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    if (storedUserId) setUserId(storedUserId);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  useEffect(() => {
    if (projectId) {
      console.log("Project ID received in Bugs page:", projectId);
    } else {
      console.warn("No project ID received from navigation.");
    }
  }, [projectId]);

  // ✅ Updated: Navigate to comments with bugId
  const handleNavigateToComments = (bugId) => {
    navigate("/comments", { state: { bugId } });
  };

  const fetchAllBugs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !projectId) return;

      const response = await fetch(`http://localhost:8585/api/bugs/project/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setBugs(data);
      }
    } catch (error) {
      console.error("Error fetching bugs:", error);
    }
  };

  useEffect(() => {
    fetchAllBugs();
  }, [bugs]);

  const handleAddBug = (newBug) => {
    setBugs((prev) => [newBug, ...prev]);
    setIsBugModalOpen(false);
  };

  const handleEdit = (bug) => {
    setSelectedBug(bug);
    setIsEditModalOpen(true);
  };

  const handleUpdateBug = (updatedBug) => {
    setBugs((prev) =>
      prev.map((b) => (b.id === updatedBug.id ? updatedBug : b))
    );
    setIsEditModalOpen(false);
  };

  const handleDelete = (bug) => {
    setSelectedBug(bug);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedBug) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `http://localhost:8585/api/bugs/${selectedBug.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setBugs((prev) => prev.filter((b) => b.id !== selectedBug.id));
        setIsDeleteModalOpen(false);
        setSelectedBug(null);
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete bug.");
      }
    } catch (error) {
      console.error("Error deleting bug:", error);
      alert("Something went wrong while deleting bug.");
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      fetchAllBugs();
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:8585/api/bugs/${searchId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setBugs([data]);
      } else {
        alert(data.message || "Bug not found.");
        setBugs([]);
      }
    } catch (error) {
      console.error("Error searching bug:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="bg-yellow-500 text-black px-6 py-3 flex justify-between items-center mb-6">
        <div className="text-lg font-semibold">Bug Tracker</div>
        <div className="text-sm">
          Logged in as: <span className="font-bold">{username}</span> (ID: {userId})
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Bugs List for Project ID: {projectId}</h1>
        <button
          className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition-colors"
          onClick={() => setIsBugModalOpen(true)}
        >
          + Add Bug
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="Enter Bug ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="px-3 py-2 border border-yellow-500 rounded bg-black text-yellow-300"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600"
        >
          Search
        </button>
      </div>

      {/* Bug List */}
      <div className="mt-4 space-y-4">
        {bugs.length > 0 ? (
          bugs.map((bug) => (
            <BugCard
              key={bug.id}
              bug={bug}
              onEdit={() => handleEdit(bug)}
              onDelete={() => handleDelete(bug)}
              onclick={() => handleNavigateToComments(bug.id)} // ✅ send bugId to comments
            />
          ))
        ) : (
          <p className="text-gray-400">No bugs found.</p>
        )}
      </div>

      {/* Modals */}
      {isBugModalOpen && (
        <BugModal
          isOpen={isBugModalOpen}
          onClose={() => setIsBugModalOpen(false)}
          onAdd={handleAddBug}
          projectId={projectId}
        />
      )}

      {isEditModalOpen && selectedBug && (
        <EditBugModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          bug={selectedBug}
          onUpdate={handleUpdateBug}
        />
      )}

      {isDeleteModalOpen && selectedBug && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          bugTitle={selectedBug.title}
        />
      )}
    </>
  );
}
