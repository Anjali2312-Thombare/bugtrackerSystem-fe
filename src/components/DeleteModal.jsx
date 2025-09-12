import React, { useState } from "react";

const DeleteModal = ({ isOpen, onClose, bugId, bugTitle, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:8585/api/bugs/${bugId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onDeleted();  // callback to parent on success
        onClose();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete bug.");
      }
    } catch (err) {
      setError("Something went wrong while deleting bug.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-black text-yellow-300 border border-yellow-600 rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">Are you sure you want to delete the bug "{bugTitle}"?</p>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-yellow-500 text-yellow-400 rounded hover:bg-yellow-600 hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`px-4 py-2 bg-red-600 text-black font-semibold rounded hover:bg-red-700 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
