import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Projects from './pages/Projects';
import Queries from './pages/Queries';
import Topics from './pages/Topics';
import Settings from './pages/Settings';
import useThemeFavicon from '../useThemeFavicon';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  useThemeFavicon();
  return (
    <ThemeProvider>
      <Router>
        <div className="flex min-h-screen bg-blue-50/30 dark:bg-gray-900 transition-colors duration-200">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/queries" element={<Queries />} />
                <Route path="/topics" element={<Topics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;