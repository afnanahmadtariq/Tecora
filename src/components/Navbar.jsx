import { FiSearch, FiMoon, FiSun } from 'react-icons/fi';
import { useState } from 'react';
import { SignUpModal, LoginModal } from './AuthModals';
import { PostModal } from './PostModals';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSwitchToLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const handleSwitchToSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 transition-colors duration-200">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-200"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPostOpen(true)}
              className="bg-[#38BDF8] text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
            >
              Post Query
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? <FiSun className="h-5 w-5 text-gray-100" /> : <FiMoon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsSignUpOpen(true)}
              className="bg-[#38BDF8] text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <SignUpModal 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <PostModal 
        isOpen={isPostOpen} 
        onClose={() => setIsPostOpen(false)}
      />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
    </>
  );
}