import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { fetchProjectDetails } from '../api/projects'; // Assuming this API call fetches project details

export default function ProjectDetails() {
  const { projectId } = useParams(); // Get project ID from the URL
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
    <div className="flex max-w-6xl mx-auto mt-8 p-4">

      {/* Main Content */}
      <div className="w-4/5 pl-6">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          {project.title}
        </h1>
        <div className="text-gray-700 dark:text-gray-300 mb-6">
          <p className="font-medium mb-2">Description:</p>
          <p>{project.description}</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">
            Progress: {project.progress}
          </span>
          <span className="text-sm text-gray-500">
            Created: {new Date(project.dateOfCreation).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-2xl font-semibold text-blue-500 mb-4">Questions</h3>
        <div className="space-y-4">
          {/* {project.questions.map((question, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm"
            >
              <p className="text-gray-700 dark:text-gray-300">
                {question.text}
              </p>
              <button className="text-blue-500 hover:underline">
                View Answers
              </button>
            </div>
          ))} */}
        </div>

        <button className="mt-6 flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600">
          Add Question
        </button>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/5 ml-6 border-l border-gray-300 dark:border-gray-700 pl-6">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
          Related Projects
        </h3>
        <ul className="space-y-2 text-gray-500">
          <li className="hover:text-blue-500">UI/UX Journey</li>
          <li className="hover:text-blue-500">Mobile Development</li>
          <li className="hover:text-blue-500">Remote Work</li>
          <li className="hover:text-blue-500">SEO Success Strategies</li>
        </ul>
      </div>
    </div>
  );
}
