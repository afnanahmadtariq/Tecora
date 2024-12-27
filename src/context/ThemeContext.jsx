import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}


// Define theme configurations
const themes = {
  light: {
    bg: 'bg-white',
    text: 'text-gray-900',
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  },
  dark: {
    bg: 'bg-gray-900',
    text: 'text-gray-100',
    primary: 'bg-indigo-500 hover:bg-indigo-700 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-300',
  },
  forest: {
    bg: 'bg-green-100',
    text: 'text-green-900',
    primary: 'bg-green-700 hover:bg-green-900 text-white',
    secondary: 'bg-green-300 hover:bg-green-400 text-green-800',
  },
};

function App() {
  const [currentTheme, setCurrentTheme] = useState('light'); // Default theme

  const theme = themes[currentTheme];

  const handleThemeChange = (event) => {
    setCurrentTheme(event.target.value);
  };

  return (
    <div className={`${theme.bg} ${theme.text} min-h-screen p-4`}>
      {/* Theme selector */}
      <div className="mb-4">
        <label htmlFor="theme-select" className="mr-2">Select Theme:</label>
        <select id="theme-select" value={currentTheme} onChange={handleThemeChange} className='border rounded p-1'>
          {Object.keys(themes).map((themeName) => (
            <option key={themeName} value={themeName}>
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Example content using theme styles */}
      <h1 className="text-3xl font-bold mb-4">Themed Content</h1>
      <p className="mb-4">
        This content is styled according to the selected theme. The background, text, and button colors will change dynamically.
      </p>

      <button className={`${theme.primary} py-2 px-4 rounded mr-2`}>Primary Button</button>
      <button className={`${theme.secondary} py-2 px-4 rounded`}>Secondary Button</button>

      <div className="mt-4 p-4 rounded" style={{backgroundColor: theme.bg === "bg-white" ? "#eee": (theme.bg === "bg-gray-900" ? "#333" : "#ccffcc")}}>
      <p>This is a test div to show the background color more clearly. It uses inline styles for better contrast.</p>
      </div>
    </div>
  );
}
