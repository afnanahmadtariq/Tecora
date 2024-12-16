import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectPage';
import Queries from './pages/Queries';
import QueryPage from './pages/QueryPage';
import Topics from './pages/Topics';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Subscription from './pages/Subscription';
import useThemeFavicon from '../useThemeFavicon';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  useThemeFavicon();
  return (
    <ThemeProvider>
      <Router>
        <div className="flex-1 min-h-screen bg-blue-50/30 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectDetails />} />
                <Route path="/queries" element={<Queries />} />
                <Route path="/queries/:queryId" element={<QueryPage />} />
                <Route path="/topics" element={<Topics />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/subscription" element={<Subscription />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;