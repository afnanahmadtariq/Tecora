import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiMoon, FiSun, FiMenu, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { SignUpModal, LoginModal } from './AuthModals';
import { PostModal } from './PostModal';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import clsx from 'clsx';

export default function Navbar({ onMenuClick }) {
  const { isLoggedIn, logout, getProfilePic } = useUser();
  const { isDark, toggleTheme } = useTheme();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={onMenuClick}
              className="md:hidden p-2 hover:bg-accent rounded-md text-foreground"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center gap-2">
               <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">T</span>
               </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent hidden sm:block">
                Tecora
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative group">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-background border border-input rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsPostOpen(true)}
              className="hidden sm:flex items-center justify-center h-9 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
            >
              New Post
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <FiMoon className="h-5 w-5" /> : <FiSun className="h-5 w-5" />}
            </button>

            {isLoggedIn ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <img
                    src={getProfilePic()}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-background"
                  />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-popover p-1 shadow-lg text-popover-foreground animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-2 py-1.5 text-sm font-semibold border-b border-border/50 mb-1">
                      My Account
                    </div>
                    <button onClick={() => { navigate("/profile"); setIsMenuOpen(false); }} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground text-left">
                      <FiUser className="h-4 w-4" /> Profile
                    </button>
                    <button onClick={() => { navigate("/settings"); setIsMenuOpen(false); }} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground text-left">
                      <FiSettings className="h-4 w-4" /> Settings
                    </button>
                     <div className="h-px bg-border/50 my-1" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-destructive/10 text-destructive hover:text-destructive text-left">
                      <FiLogOut className="h-4 w-4" /> Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                 <button
                  onClick={() => setIsLoginOpen(true)}
                  className="text-sm font-medium hover:text-primary px-3 py-2 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => setIsSignUpOpen(true)}
                  className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Sign up
                </button>
              </div>
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
