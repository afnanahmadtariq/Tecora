import { useState, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi'; // API to fetch experts' data
import fetchTopExperts from '../api/experts';

export default function ExpertsPage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getExperts = async () => {
      try {

        const data = await fetchTopExperts;
        setExperts(data);
      } catch (error) {
        console.error('Failed to load experts.');
      } finally {
        setLoading(false);
      }
    };

    getExperts();
  }, []);

  if (loading) return <p>Loading experts...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Top Experts of Tecora</h1>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{expert.name}</h3>
              <p className="text-sm text-gray-600">{expert.specialization}</p>
              <div className="text-xs text-gray-500 flex space-x-4 mt-1">
                <span>⬆ {expert.followers}m</span>
                <span>🔥 {expert.recommendations}k</span>
              </div>
              <a
                href={expert.profileLink}
                className="mt-2 text-blue-500 hover:text-blue-600 flex items-center"
              >
                Open Profile
                <FiExternalLink className="ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
