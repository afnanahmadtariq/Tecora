import { useState, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { fetchProjects } from '../api/projects'; 

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  
  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-colors duration-200">
            <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>
            <button className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
              Open Project
              <FiExternalLink className="ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}