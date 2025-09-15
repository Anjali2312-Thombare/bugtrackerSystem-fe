import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import EditProjectModal from "../components/EditProjectModal";
import ProjectModal from "../components/ProjectModal";

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleClick = (projectId) => {
    navigate("/bugs", { state: { projectId } });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    const usernameFromStorage = localStorage.getItem("username");

    if (!userIdFromStorage) {
      console.error("No user ID found in localStorage");
      return;
    }

    setUserId(userIdFromStorage);
    setUsername(usernameFromStorage || "");

    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `http://localhost:8585/api/projects/user/${userIdFromStorage}`
        );
        if (!res.ok) throw new Error("Failed to fetch projects for user");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [projects]);

  const handleSave = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.id === updatedProject.id ? updatedProject : proj
      )
    );
  };

  const handleAdd = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <>
      {/* Navbar with right-aligned tabs */}
      <div className="bg-yellow-500 text-black px-6 py-3 flex justify-between items-center mb-6">
        {/* Left: App Title */}
        <div className="text-lg font-semibold">🐛 Bug Tracker</div>

        {/* Right: Tabs */}
        <div className="flex space-x-6 items-center text-sm font-medium">
          <span className="text-gray-800">Hello, <strong>{username}</strong> ( {userId})</span>
          <button
            onClick={() => navigate("/all-projects")}
            className="hover:underline"
          >
            All Projects
          </button>
          <button
            onClick={() => navigate("/all-bugs")}
            className="hover:underline"
          >
            All Bugs
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="hover:underline"
          >
            All Profiles
          </button>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">
          User Dashboard page where user can see all their projects
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition-colors"
        >
          + Create Project
        </button>
      </div>

      {/* Project List */}
      <div className="mt-6 space-y-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            onEdit={() => setEditingProject(project)}
            onDelete={() => console.log("Delete project", project.id)}
            onclick={() => handleClick(project.id)}
          />
        ))}
      </div>

      {editingProject && (
        <EditProjectModal
          isOpen={!!editingProject}
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleSave}
        />
      )}

      {isCreateModalOpen && (
        <ProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onAdd={handleAdd}
        />
      )}
    </>
  );
}
