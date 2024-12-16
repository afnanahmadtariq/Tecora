import { useState, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { fetchQueries } from '../api/queries'; 

const tabs = ['All', 'Posts', 'Project'];

export default function Queries() {
  const [activeTab, setActiveTab] = useState('All');
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch queries from API
  useEffect(() => {
    const getQueries = async () => {
      try {
        const data = await fetchQueries();
        setQueries(data.queries);
      } catch (err) {
        setError('Failed to load queries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getQueries();
  }, []);

  // Filter queries based on activeTab
  const filteredQueries = queries.filter((query) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Posts') return !query.solved;
    if (activeTab === 'Project') return query.solved;
    return true;
  });

  // Navigate to specific query page
  const handleCardClick = (queryId) => {
    navigate(`/queries/${queryId}`); // Use navigate
  };

  // Navigate to query page and scroll to answers section
  const handleViewAnswersClick = (queryId) => {
    navigate(`/queries/${queryId}#answers`); // Use navigate
  };

  if (loading) {
    return <p>Loading queries...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">Saved</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Display Queries */}
      <div className="space-y-4">
        {filteredQueries.map((query) => (
          <div
            key={query.query_id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all duration-200 transform hover:scale-95 hover:shadow-lg cursor-pointer flex flex-col"
            onClick={() => handleCardClick(query.query_id)}
            >
              <div className="flex-1"> {/* This will grow to take available space */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {query.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{query.date}</p>
                  <div className="flex flex-wrap gap-2">
                    {query.tags && query.tags.split(',').map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              {/* Replies & View Answers Button */}
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Replies: {query.replies}
                </span>
                <button
                  className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    handleViewAnswersClick(query.query_id);
                  }}
                >
                  View Answers
                  <FiExternalLink className="ml-1" />
                </button>
              </div>
            </div>

            {/* Solved/Open Badge */}
            <div
              className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${
                query.solved
                  ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200'
              }`}
            >
              {query.solved ? 'Solved' : 'Open'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
