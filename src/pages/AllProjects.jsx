import { useEffect, useState } from "react";
import AllProjectsCard from "../components/Projects";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await fetch("http://localhost:8585/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching all projects:", err);
        setError("Could not load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        All Projects
      </h1>

      {loading && <p className="text-white text-center">Loading projects...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <AllProjectsCard
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            createdBy={project.createdBy}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
