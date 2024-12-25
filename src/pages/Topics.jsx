import { FiExternalLink } from 'react-icons/fi';
import { useState } from 'react';

const questions = [
  {
    id: 1,
    title: 'What tools can help streamline project management for a remote team?',
    date: 'Apr 20, 2024',
    tags: ['Management', 'Software Project', 'Software Company'],
    replies: 10,
  },
  {
    id: 2,
    title: 'What are the best practices for optimizing website performance?',
    date: 'Apr 20, 2024',
    tags: ['Website', 'React', 'Software Company'],
    replies: 10,
  },
];

const trendyTopics = [
  'Programming',
  'Digital Marketing',
  'Artificial Intelligence',
  'Web Development',
  'UI/UX trends',
];

const specializedTopics = [
  'Website designing',
  'Mockups',
  'React Development',
  'WordPress',
];

export default function Topics() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <div className="flex gap-8 px-8 py-6">
      <main className="w-full lg:w-4/5">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">UI/UX Designing</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Projects &gt; UI/UX Designing</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Write your Post here</h2>
          <textarea
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            placeholder="Write your post..."
            rows="3"
          ></textarea>
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">B</button>
              <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">U</button>
              <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">I</button>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
              New Post
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          {['All', 'New Posts', 'Most Replied'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedFilter === filter
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {question.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{question.date}</p>
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag) => (
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
                    Replies: {question.replies}
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
      </main>

      <aside className="hidden lg:block w-1/5">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trendy Topics</h2>
          <ul className="space-y-2">
            {trendyTopics.map((topic) => (
              <li key={topic} className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Specialized for You
          </h2>
          <ul className="space-y-2">
            {specializedTopics.map((topic) => (
              <li key={topic} className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}