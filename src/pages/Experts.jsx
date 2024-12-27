import { useState, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi"; // API to fetch experts' data
import fetchTopExperts from "../api/experts";
import { Link } from "react-router-dom";

export default function ExpertsPage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getExperts = async () => {
      try {
        const data = await fetchTopExperts;
        setExperts(data);
      } catch (error) {
        console.error("Failed to load experts.");
      } finally {
        setLoading(false);
      }
    };

    getExperts();
  }, []);

  if (loading) return <p>Loading experts...</p>;

  return (
    <div className="max-w-6xl mx-auto p-2">
      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Top Experts</h1>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert, index) => (
          <div
            key={index}
            className="flex items-center bg-[var(--accent-light)] dark:bg-[#1d2e3e] p-4 px-5 rounded-lg shadow-md gap-[5px]"
          >
            <div className="w-[66%]">
              <h3 className="text-[1rem] font-semibold text-[var(--primary-color-light)] dark:text-[var(--primary-color-dark)]">
                {expert.name}
              </h3>
              <p className="  text-[.7rem] text-[var(--p-light)] dark:text-[var(--p-dark)] ">
                {expert.specialization}
              </p>
              <div className="text-xs text-[var(--p-light)] dark:text-[var(--p-dark)]  flex space-x-4 mt-1">
                <span>⬆ {expert.followers}m</span>
                <span>🔥 {expert.recommendations}k</span>
              </div>
              <Link
                to="/expertProfile"
                state={{ expert }}
                className="mt-2 text-[.8rem] text-[var(--secondary-color-light)] dark:text-[var(--secondary-color-dark)] flex items-center"
              >
                Open Profile
                <FiExternalLink className="ml-1" />
              </Link>
            </div>
            <div className="extert-img-section w-[40%]">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-[90%] h-auto rounded-full object-cover mr-4"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
