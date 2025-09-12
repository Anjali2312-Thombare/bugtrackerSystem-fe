import React, { useState } from "react";

const ProjectModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token) {
        alert("Authorization token not found.");
        return;
      }

      if (!userId) {
        alert("User ID not found in localStorage.");
        return;
      }

      console.log("User ID from localStorage:", userId); // 👈 logging it

      const body = {
        name: formData.name,
        description: formData.description,
        createdBy: {
          id: parseInt(userId),
        },
      };

      const response = await fetch("http://localhost:8585/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Project created successfully.");
        onAdd(data.project || body);
        onClose();
      } else {
        alert(data.message || "Failed to create project.");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Something went wrong while creating the project.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-black text-yellow-300 border border-yellow-600 rounded-lg p-6 w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-yellow-500 rounded text-yellow-300 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 bg-black border border-yellow-500 rounded text-yellow-300 focus:outline-none"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-yellow-500 text-yellow-400 rounded hover:bg-yellow-600 hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
