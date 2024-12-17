import { FiExternalLink, FiSend } from 'react-icons/fi';

const posts = Array(10).fill({
  id: 1,
  title: 'What tools can help streamline project management for a remote team?',
  description:
    'What tools can help streamline project management for a remote team? What tools can help streamline project management for a remote team? What tools can help streamline project management for a remote team? Read more...',
  date: 'Apr 20, 2024',
  tags: ['UX/UI', 'Website Design', 'Mobile Design'],
});

const replies = [
  { id: 1, text: 'Some tool can be used', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 2, text: 'Figma? or something...', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 3, text: 'Use whatever you like', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 2, text: 'Figma? or something...', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 3, text: 'Use whatever you like', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 2, text: 'Figma? or something...', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 3, text: 'Use whatever you like', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 2, text: 'Figma? or something...', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 3, text: 'Use whatever you like', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 2, text: 'Figma? or something...', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 3, text: 'Use whatever you like', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 2, text: 'Figma? or something...', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 3, text: 'Use whatever you like', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 2, text: 'Figma? or something...', time: '12m', likes: '1.4k', profileUrl: '#' },
  { id: 3, text: 'Use whatever you like', time: '12m', likes: '1.4k', profileUrl: '#' },
];

export default function Explore() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Left Section: Posts */}
      <div className="lg:col-span-3">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">Explore</h1>

        <div className="space-y-4">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white my-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="text-blue-500 dark:text-blue-400 hover:text-blue-600 flex items-center">
                  View Replies
                  <FiExternalLink className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Replies */}
      <div
        className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors duration-200 sticky top-24 py-4 flex flex-col justify-between"
        // className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-colors duration-200 sticky top-0 h-screen flex flex-col justify-between">
        style={{ height: 'calc(100vh - 10rem)' }} // Dynamically calculates remaining height
      >
        {/* Header Section */}
        <div className="p-6 border-b">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Apr 20, 2024</p>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            What tools can help streamline project management for a remote team?
          </h2>
        </div>

        {/* Reply List */}
<div className="flex-1 overflow-auto p-6 space-y-4">
  {replies.map((reply) => (
    <div
      key={reply.id}
      className="flex items-start border-b pb-4 last:border-b-0"
    >
      {/* Profile Icon */}
      <a
        href={reply.profileUrl}
        className="hover:scale-105 transition-transform duration-200 mr-3"
      >
        <img
          src="https://via.placeholder.com/32"
          alt="Profile"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </a>

      {/* Reply Content */}
      <div className="flex-1">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          {reply.text}
        </p>
        <div className="flex items-center text-xs text-gray-400 space-x-4">
          {/* Time and Likes */}
          <span>
            {reply.time} · {reply.likes}{' '}
            <span className="text-red-500">♥</span>
          </span>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Upvote Button */}
            <button
              title="Upvote"
              className="text-gray-500 hover:text-blue-500 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>

            {/* Downvote Button */}
            <button
              title="Downvote"
              className="text-gray-500 hover:text-red-500 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Reply Button */}
            <button
              title="Reply"
              className="text-gray-500 hover:text-green-500 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h11M9 21l-6-6 6-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


        {/* Reply Input */}
        <div className="p-4 border-t">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Add your reply..."
              className="w-full p-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md flex items-center justify-center"
              title="Send Reply"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
