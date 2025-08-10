import { FiBook, FiMessageSquare, FiFolder, FiUsers, FiUser, FiShare2 } from 'react-icons/fi';

const services = [
  { name: 'Expert Guidance', icon: FiBook },
  { name: 'Q&A Platform', icon: FiMessageSquare },
  { name: 'Project Creation', icon: FiFolder },
  { name: 'Collaborative Learning', icon: FiUsers },
  { name: 'Personalized Feed', icon: FiUser },
  { name: 'Resource Sharing', icon: FiShare2 },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-12">
      <section className="mb-20 flex flex-row">
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 bg-primary-gradient bg-clip-text text-transparent">
              Welcome to Tecora Communications
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Unlock real-time advice from industry experts and professionals. Whether you're seeking
              answers to tough questions or looking to collaborate on projects, Tecora connects you
              with the right minds to help you learn, grow, and succeed!
            </p>
            <button className="bg-primary-gradient text-white px-6 py-3 rounded-md transition-colors">
              Sign Up
            </button>
          </div>
          <div className="w-96 h-96 relative">
            {/* Add your logo/illustration here */}
          </div>
        </div>
        <div>
          <img src="/main-logo.svg" alt="main Logo" className="w-96 h-96 object-contain" />
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.name}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Mission</h2>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            At Tecora, our mission is to empower individuals and communities by connecting learners
            with experts in real-time. We believe that knowledge is most valuable when shared, and
            our platform provides a space where questions can be asked, insights can be shared, and
            collaborations can thrive.
          </p>
        </div>
      </section>
    </div>
  );
}