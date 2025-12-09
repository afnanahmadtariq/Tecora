import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectPage";
import MyWorks from "./pages/MyWorks";
import PostPage from "./pages/PostPage";
import Topics from "./pages/Topics";
import TopExperts from "./pages/Experts";
import Saved from "./pages/Saved";
import MyProfile from "./pages/MyProfile";
import Settings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import useThemeFavicon from "../useThemeFavicon";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import Profile from "./pages/profile/Profile";
import Community from "./pages/Community"; // Added import for Community

function App() {
  useThemeFavicon();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans selection:bg-primary/20">
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="flex relative items-start">
              <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
              <main className="flex-1 w-full min-w-0 px-4 sm:px-6 md:px-8 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
                 <div className="max-w-7xl mx-auto">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/projects/:projectId" element={<ProjectDetails />} />
                      <Route path="/myworks" element={<MyWorks />} />
                      <Route path="/post/:postId" element={<PostPage />} />
                       {/* Legacy route for posts if used elsewhere */}
                      <Route path="/posts/:postId" element={<PostPage />} />
                      <Route path="/topics" element={<Topics />} />
                      <Route path="/experts" element={<TopExperts />} />
                      <Route path="/saved" element={<Saved />} />
                      <Route path="/profile" element={<MyProfile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/subscription" element={<Subscription />} />
                      <Route path="/expertProfile" element={<Profile />} />
                      <Route path="/community" element={<Community />} />
                    </Routes>
                 </div>
              </main>
              {/* Mobile overlay */}
              {isSidebarOpen && (
                <div 
                  className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm animate-in fade-in"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
            </div>
            
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
