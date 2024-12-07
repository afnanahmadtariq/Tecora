import { useState, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { fetchQueries } from '../api/queries'; 

const tabs = ['All', 'Active', 'Solved'];

export default function Queries() {
  const [activeTab, setActiveTab] = useState('All');
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch queries from API
  useEffect(() => {
    const getQueries = async () => {
      try {
        const data = await fetchQueries();
        setQueries(data);
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
    if (activeTab === 'Active') return !query.verified;
    if (activeTab === 'Solved') return query.verified;
    return true;
  });

  if (loading) {
    return <p>Loading queries...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">My Queries</h1>
      
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

      <div className="space-y-4">
        {filteredQueries.map((query) => (
          <div key={query.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-colors duration-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {query.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{query.date}</p>
                <div className="flex flex-wrap gap-2">
                  {query.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Replies: {query.replies}
                </span>
                <button className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
                  View Answers
                  <FiExternalLink className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
