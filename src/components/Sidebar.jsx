import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiCompass, FiFolder, FiHelpCircle, FiGlobe, FiAward, FiBookmark, FiSettings, FiX, FiChevronRight } from 'react-icons/fi';
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
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();

  return (
    <>
      <aside 
        className={clsx(
          "bg-background/95 backdrop-blur border-r border-border py-6 px-3 z-50 transition-transform duration-300 w-64",
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
              const isTopics = item.name === 'Topics';
              
              if (isTopics) {
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      to={item.href}
                      onClick={() => onClose?.()}
                      className={clsx(
                        'flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div className="flex items-center">
                        <Icon
                          className={clsx(
                            'mr-3 h-5 w-5 flex-shrink-0 transition-colors',
                            isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-accent-foreground'
                          )}
                        />
                        {item.name}
                      </div>
                      <FiChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    {/* Hover Submenu */}
                    <div className="absolute left-[85%] top-1/2 -translate-y-[35%] w-80 min-h-[450px] bg-background border border-border/60 shadow-2xl rounded-2xl p-6 hidden group-hover:flex flex-col z-[1000] ml-2 animate-in fade-in slide-in-from-left-2 duration-300 origin-left">
                       <div className="space-y-8 flex-1">
                          {/* Trendy Topics Section */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="p-1.5 bg-red-500/10 rounded-md">
                                <FiAward className="w-3.5 h-3.5 text-red-500" />
                              </span>
                              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Trendy Topics</h3>
                            </div>
                            <ul className="space-y-1">
                              {["Programming", "Digital Marketing", "Artificial Intelligence", "Web Development", "UI/UX Design"].map(topic => (
                                <li 
                                  key={topic} 
                                  onClick={() => { navigate(`/topics?topic=${encodeURIComponent(topic)}`); onClose?.(); }}
                                  className="flex items-center justify-between p-2 rounded-lg text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all group/item"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 bg-red-400/50 group-hover/item:bg-red-500 rounded-full transition-colors"></span>
                                    <span className="font-medium">{topic}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Specialized Section */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="p-1.5 bg-blue-500/10 rounded-md">
                                <FiCompass className="w-3.5 h-3.5 text-blue-500" />
                              </span>
                              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Specialized for You</h3>
                            </div>
                            <ul className="space-y-1">
                              {["Website designing", "Mockups", "React Development", "WordPress"].map(topic => (
                                <li 
                                  key={topic} 
                                  onClick={() => { navigate(`/topics?topic=${encodeURIComponent(topic)}`); onClose?.(); }}
                                  className="flex items-center justify-between p-2 rounded-lg text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all group/item"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 bg-blue-400/50 group-hover/item:bg-blue-500 rounded-full transition-colors"></span>
                                    <span className="font-medium">{topic}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                       </div>

                       {/* Footer Action */}
                       <div className="pt-4 mt-4 border-t border-border/50">
                          <Link to="/topics" className="flex items-center justify-center w-full py-2.5 text-xs font-semibold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors group/btn">
                            View All Topics
                            <FiChevronRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                          </Link>
                       </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => onClose?.()}
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