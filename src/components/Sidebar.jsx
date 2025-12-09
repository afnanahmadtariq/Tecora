import { Link, useLocation } from 'react-router-dom';
import { FiCompass, FiFolder, FiHelpCircle, FiGlobe, FiAward, FiBookmark, FiSettings, FiX } from 'react-icons/fi';
import clsx from 'clsx';
import { useUser } from '../context/UserContext';

const navigation = [
  { name: 'Explore', icon: FiCompass, href: '/explore', show: true },
  { name: 'Projects', icon: FiFolder, href: '/projects', show: true },
  { name: 'Queries', icon: FiHelpCircle, href: '/queries', show: false },
  { name: 'Topics', icon: FiGlobe, href: '/topics', show: true },
  { name: 'Top Experts', icon: FiAward, href: '/experts', show: true },
  { name: 'Saved', icon: FiBookmark, href: '/saved', show: false },
  { name: 'Settings', icon: FiSettings, href: '/settings', show: false },
  { name: 'Community', icon: FiGlobe, href: '/community', show: true },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { isLoggedIn } = useUser();

  return (
    <>
      <aside 
        className={clsx(
          "bg-background/95 backdrop-blur border-r border-border overflow-y-auto py-6 px-3 z-50 transition-transform duration-300 w-64",
          "md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 md:shadow-none", // Desktop styles
          "fixed inset-y-0 left-0 h-full shadow-2xl", // Mobile styles
          isOpen ? "translate-x-0" : "-translate-x-full" // Mobile toggle
        )}
      >
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-md">
            <FiX className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            if (item.show || isLoggedIn) {
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => onClose?.()} // Close sidebar on mobile when link is clicked
                  className={clsx(
                    'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={clsx(
                      'mr-3 h-5 w-5 flex-shrink-0 transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-accent-foreground'
                    )}
                  />
                  {item.name}
                </Link>
              );
            }
            return null;
          })}
        </nav>
        
        <div className="mt-8 px-4">
          <div className="h-px bg-border my-4" />
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Tecora
          </p>
        </div>
      </aside>
    </>
  );
}