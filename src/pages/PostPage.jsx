import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPostById } from '../api/posts'; 

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const data = await fetchPostById(postId); 
        setPost(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load post details!!!!!!!!!. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getPostDetails();
  }, [postId]);

  useEffect(() => {
    if (window.location.hash === '#answers') {
      const answersSection = document.getElementById('answers');
      if (answersSection) {
        answersSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [postId]);

  if (loading) {
    return <p>Loading post details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
        Post Details for ID: {postId}
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">{post.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{new Date(post.date).toLocaleString()}</p>
        <div className="text-gray-700 dark:text-gray-300 mb-4">
          <p>{post.description}</p>
        </div>

        {post.media && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Media</h3>
            <img src={post.media} alt="Post media" className="max-w-full rounded-md shadow-sm" />
          </div>
        )}

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

      {/* Answers Section */}
      <div id="answers" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">Answers</h3>
        {post.answers && post.answers.length > 0 ? (
          <ul className="space-y-4">
            {post.answers.map((answer, index) => (
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
