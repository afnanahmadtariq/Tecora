import { useState, useEffect, useRef } from 'react';
import { Link} from 'react-router-dom';
import { FiSearch, FiMoon, FiSun } from 'react-icons/fi';
import { SignUpModal, LoginModal } from './AuthModals';
import { PostModal } from './PostModal';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { isLoggedIn, logout, getProfilePic } = useUser();
  const { isDark, toggleTheme } = useTheme();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
<<<<<<< Updated upstream
=======
  const [profilepic, setprofilepic] = useState("https://robohash.org/example");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
>>>>>>> Stashed changes
  const [isMenuOpen, setIsMenuOpen] = useState(false); // To control the menu visibility
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const handleSwitchToLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const handleSwitchToSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };
  
  const handleThemeChange = () => {
    toggleTheme();
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsMenuOpen(false);
  };

  const handleSubscriptionClick = () => {
    navigate("/subscription");
    setIsMenuOpen(false);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Handle logout logic here
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-10 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 transition-colors duration-200">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Tecora</span>
          </Link>
          <div className="flex-1 max-w-2xl">
              <div className="flex-1 relative">
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
              {isDark ? <FiMoon className="h-5 w-5 text-gray-100" /> : <FiSun className="h-5 w-5" />}
            </button>

            {/* Conditionally render based on login status */}
            {isLoggedIn ? (
              <div className="relative">
                <div
                  onClick={handleMenuToggle}
                  className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer hover:ring-2 hover:ring-blue-500"
                >
                  {/* Replace with user's profile image */}
                  <img
                    src={getProfilePic()} // Replace with dynamic profile image URL
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                {isMenuOpen && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg w-48 z-20"
                  >
                    <ul className="text-gray-800 dark:text-gray-100">
                      <li
                        onClick={handleProfileClick}
                        className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        Profile
                      </li>
                      <li
                        onClick={handleThemeChange}
                        className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        Theme
                      </li>
                      <li
                        onClick={handleSubscriptionClick}
                        className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        Subscription
                      </li>
                      <li
                        onClick={handleSettingsClick}
                        className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        Settings
                      </li>
                      <li
                        onClick={handleLogout}
                        className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        Log Out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-[#38BDF8] text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
              >
                Log in
              </button>
            )}
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
        onLoginSuccess={handleLoginSuccess}
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
    </>
  );
}
