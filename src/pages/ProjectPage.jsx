import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { fetchProjectDetails } from '../api/projects';  // Assuming this API call fetches project details

export default function ProjectDetails() {
  const { projectId } = useParams();  // Get project ID from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const data = await fetchProjectDetails(projectId);
        setProject(data);
      } catch (err) {
        console.log('Failed to load project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getProjectDetails();
  }, [projectId]);

  if (loading) {
    return <p>Loading project details...</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">{project.title}</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">Project Information</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Progress: {project.progress}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Created: {new Date(project.dateOfCreation).toLocaleDateString()}</p>

        <div className="mt-4">
          <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">User Information</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">Username: {project.user.username}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Email: {project.user.email}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Bio: {project.user.bio}</p>
        </div>

        <button className="mt-6 flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
          Open Project
          <FiExternalLink className="ml-1" />
        </button>
      </div>
    </div>
  );
}
