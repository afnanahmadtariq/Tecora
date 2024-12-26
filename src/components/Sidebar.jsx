import { Link, useLocation } from 'react-router-dom';
import { FiCompass, FiFolder, FiHelpCircle, FiGlobe, FiAward, FiBookmark, FiSettings } from 'react-icons/fi';
import clsx from 'clsx';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const navigation = [
  { name: 'Explore', icon: FiCompass, href: '/explore', show: true },
  { name: 'Projects', icon: FiFolder, href: '/projects', show: true },
  { name: 'My Posts', icon: FiHelpCircle, href: '/myposts', show: true },
  { name: 'Topics', icon: FiGlobe, href: '/topics', show: true },
  { name: 'Top Experts', icon: FiAward, href: '/experts', show: true },
  { name: 'Saved', icon: FiBookmark, href: '/saved', show: false },
  { name: 'Settings', icon: FiSettings, href: '/settings', show: false },
];

export default function Sidebar() {
  const location = useLocation();
  const { isLoggedIn } = useUser();

  return (
    <aside className="sticky top-20 py-4 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 px-4 py-6 transition-colors duration-200"
    style={{ height: 'calc(100vh - 5rem)' }}
    >
      <nav className="space-y-1">
        {navigation.map((item) => {

          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          if( item.show || isLoggedIn ){
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            );
          }
        })}
      </nav>
    </aside>
  );
}