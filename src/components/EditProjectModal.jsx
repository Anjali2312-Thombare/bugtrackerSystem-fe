import React, { useState, useEffect } from 'react';

const EditProjectModal = ({ isOpen, onClose, project, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        alert("Authorization token is missing.");
        return;
      }

      const response = await fetch(`http://localhost:8585/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: project.id,
          name: formData.name,
          description: formData.description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Project updated successfully.");
        onSave({ ...project, ...formData }); // update parent component
        onClose(); // close modal
      } else {
        console.error('Failed to update project:', data.message);
        alert(data.message || "Failed to update project.");
      }
    } catch (error) {
      console.error('Error during update:', error);
      alert("An unexpected error occurred.");
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-black text-yellow-300 border border-yellow-600 rounded-lg p-6 w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Project ID</label>
          <input
            type="text"
            value={project.id}
            disabled
            className="w-full px-3 py-2 bg-gray-800 border border-yellow-500 rounded text-yellow-400"
          />
        </div>

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
            onClick={handleSave}
            className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
