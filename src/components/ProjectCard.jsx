import React from 'react';

const ProjectCard = ({ id, name, description, onEdit, onDelete, onclick }) => {
  const handleDelete = async (e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(`Are you sure you want to delete project "${name}"?`);
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8585/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Project deleted successfully.");
        if (onDelete) onDelete(id); // Notify parent to remove from list
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to delete project.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project.");
    }
  };

  return (
    <div
      className="bg-black text-yellow-400 border border-yellow-500 rounded-lg shadow-lg p-6 w-300 ml-4 mr-4"
      onClick={onclick}
    >
      <div className="mb-2 text-sm text-yellow-500">Project ID: #{id}</div>
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-yellow-300 mb-4">{description}</p>
      <div className="flex space-x-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 border border-yellow-500 text-yellow-400 font-semibold rounded hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
