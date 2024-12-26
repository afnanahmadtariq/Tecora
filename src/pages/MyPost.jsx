import { useState, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { fetchMyPosts } from '../api/posts'; 

const tabs = ['All', 'Active', 'Solved'];

export default function Posts() {
  const [activeTab, setActiveTab] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch posts from API
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchMyPosts();
        setPosts(data);
      } catch (err) {
        console.log('Failed to load posts. Please try again later.', err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  // Filter posts based on activeTab
  const filteredPosts = posts.filter((post) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Active') return !post.solved;
    if (activeTab === 'Solved') return post.solved;
    return true;
  });

  // Navigate to specific post page
  const handleCardClick = (postId) => {
    navigate(`/myposts/${postId}`); // Use navigate
  };

  // Navigate to post page and scroll to answers section
  const handleViewAnswersClick = (postId) => {
    navigate(`/myposts/${postId}#answers`); // Use navigate
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">My Posts</h1>

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

      {/* Display Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all duration-200 transform hover:scale-95 hover:shadow-lg cursor-pointer flex flex-col"
            onClick={() => handleCardClick(post.id)}
            >
              <div className="flex-1"> {/* This will grow to take available space */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{post.date}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags && post.tags.split(',').map((tag) => (
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
                  Replies: {post.replies}
                </span>
                <button
                  className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    handleViewAnswersClick(post.id);
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
                post.solved
                  ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200'
              }`}
            >
              {post.solved ? 'Solved' : 'Open'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
