import { FiExternalLink } from 'react-icons/fi';

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

export default function Explore() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">Explore</h1>
        
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
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trendy topics</h2>
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
            Specialized for you
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
      </div>
    </div>
  );
}