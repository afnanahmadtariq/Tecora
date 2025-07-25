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
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data.feed);
        setError("");
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
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
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh'}}>
        <div style={{width: 48, height: 48, border: '4px solid #2563eb', borderTop: '4px solid #e0e7ef', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 16}} />
        <p style={{color: '#2563eb', fontWeight: 500}}>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh'}}>
        <svg width="80" height="80" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth="1.5" style={{marginBottom: 12}}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <p style={{color: '#2563eb', fontWeight: 500, fontSize: 18}}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{width: '100%', maxWidth: 1400, margin: '0 auto', padding: '32px 0'}}>
      <h1 style={{fontSize: '2.1rem', fontWeight: 700, color: '#23272f', marginBottom: 28, letterSpacing: '-1px'}}>Projects</h1>

      {/* Tab Navigation */}
      <div style={{display: 'flex', gap: 16, marginBottom: 28}}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontSize: '1rem',
              padding: '8px 22px',
              borderRadius: 999,
              border: 'none',
              background: activeTab === tab ? '#23272f' : '#f3f4f6',
              color: activeTab === tab ? '#fff' : '#23272f',
              fontWeight: 600,
              letterSpacing: '0.1px',
              transition: 'background 0.18s',
              cursor: 'pointer',
              boxShadow: activeTab === tab ? '0 1px 4px 0 rgba(0,0,0,0.04)' : 'none',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 32,
        width: '100%',
      }}>
        {filteredProjects.length === 0 ? (
          <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '64px 0', color: '#64748b'}}>
            <svg width="80" height="80" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth="1.5" style={{marginBottom: 12}}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div style={{fontSize: 20, fontWeight: 600, marginBottom: 6}}>No projects found</div>
            <div style={{fontSize: 15, color: '#94a3b8'}}>There are currently no projects to display.</div>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
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
