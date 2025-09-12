import React, { useState, useEffect } from "react";

const EditBugModal = ({ isOpen, onClose, bug, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    severity: "MODERATE",
    status: "NEW",
    assignedTo: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isOpen && bug) {
      setFormData({
        title: bug.title || "",
        description: bug.description || "",
        priority: bug.priority || "MEDIUM",
        severity: bug.severity || "MODERATE",
        status: bug.status || "NEW",
        assignedTo: bug.assignedTo?.id ? String(bug.assignedTo.id) : "",
      });
    }
  }, [isOpen, bug]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8585/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateBug = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated.");
      return;
    }

    // Construct updated bug data
    const updatedBug = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      severity: formData.severity,
      status: formData.status,
      updatedAt: new Date().toISOString(),
      assignedTo: { id: parseInt(formData.assignedTo) || null },
    };

    try {
      const response = await fetch(`http://localhost:8585/api/bugs/${bug.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBug),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Bug updated successfully.");
        onUpdate && onUpdate(data);
        onClose();
      } else {
        alert(data.message || "Failed to update bug.");
      }
    } catch (error) {
      console.error("Error updating bug:", error);
      alert("Something went wrong while updating bug.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-black text-yellow-300 border border-yellow-600 rounded-lg p-6 w-full max-w-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">Edit Bug</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-yellow-500 rounded text-yellow-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 bg-black border border-yellow-500 rounded text-yellow-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-yellow-500 rounded text-yellow-300"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="CRITICAL">CRITICAL</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Severity</label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-yellow-500 rounded text-yellow-300"
            >
              <option value="MINOR">MINOR</option>
              <option value="MAJOR">MAJOR</option>
              <option value="BLOCKER">BLOCKER</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-yellow-500 rounded text-yellow-300"
            >
              <option value="NEW">NEW</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="CLOSED">CLOSED</option>
              <option value="REOPENED">REOPENED</option>
              <option value="OPEN">OPEN</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Assign To</label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-yellow-500 rounded text-yellow-300"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-yellow-500 text-yellow-400 rounded hover:bg-yellow-600 hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateBug}
            className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBugModal;
