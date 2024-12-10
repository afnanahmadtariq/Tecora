import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchQueryById } from '../api/queries'; // assuming you have this function to fetch query by ID

export default function QueryPage() {
  const { queryId } = useParams();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the query details when the component mounts
  useEffect(() => {
    const getQueryDetails = async () => {
      try {
        const data = await fetchQueryById(queryId); // Fetch query by ID from API
        setQuery(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load query details!!!!!!!!!. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getQueryDetails();
  }, [queryId]);

  // Handle smooth scrolling to the answers section if URL contains #answers
  useEffect(() => {
    if (window.location.hash === '#answers') {
      const answersSection = document.getElementById('answers');
      if (answersSection) {
        answersSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [queryId]);

  if (loading) {
    return <p>Loading query details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
        Query Details for ID: {queryId}
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">{query.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{new Date(query.date).toLocaleString()}</p>
        <div className="text-gray-700 dark:text-gray-300 mb-4">
          <p>{query.description}</p>
        </div>

        {query.media && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Media</h3>
            <img src={query.media} alt="Query media" className="max-w-full rounded-md shadow-sm" />
          </div>
        )}

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

      {/* Answers Section */}
      <div id="answers" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">Answers</h3>
        {query.answers && query.answers.length > 0 ? (
          <ul className="space-y-4">
            {query.answers.map((answer, index) => (
              <li key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">{answer.date}</p>
                <p className="text-gray-700 dark:text-gray-300">{answer.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No answers yet.</p>
        )}
      </div>
    </div>
  );
}
