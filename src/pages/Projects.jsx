import { useState, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import { fetchProjects } from "../api/projects";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import htmlImg from "../assets/html.jpeg";
import ProjectCard from "../components/projectCard/ProjectCard";

const tabs = ["All", "Following", "Not Following"];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.log("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    if (activeTab === "Following") return !project.following;
    if (activeTab === "Not Following") return project.notfollowing;
    return true;
  });

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
        Projects
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-2  rounded-md transition-colors duration-200 ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProjects.map((project) => (
          <ProjectCard project={project} />
          // <div
          //   key={project.id}
          //   className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors duration-200"
          //   onClick={() => navigate(`/projects/${project.id}`)} // Use navigate to route to the project details page
          // >
          //   <div className="project-img-section w-full">
          //     <img src={htmlImg} alt="" className="projectImage w-full" />
          //   </div>
          //   <div className="project-desc py-4 px-3 flex flex-col justify-center">
          //     <h3 className="project-title text-lg font-medium text-blue-600 dark:text-blue-400">
          //       {project.title}
          //     </h3>
          //     <p className="project-desc text-sm text-gray-600 dark:text-gray-300">
          //       {project.description}
          //     </p>
          //     <button className="flex items-center justify-center py-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
          //       Open Project
          //       <FiExternalLink className="ml-1" />
          //     </button>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
}
{
  /* <div className="project-card-wrapper">
  {filteredProjects.map((project) => (
    <div
      key={project.id}
      className="project-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-colors duration-200"
    >
      <div className="project-img-section">
        <img src="" alt="" className="projectImage" />
      </div>
      <div className="project-desc">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <button className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
          Open Project
          <FiExternalLink className="ml-1" />
        </button>
      </div>
    </div>
  ))}
</div>; */
}
