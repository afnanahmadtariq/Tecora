import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectPage";
import MyPosts from "./pages/MyPost";
import MyPostPage from "./pages/MyPostPage";
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

function App() {
  useThemeFavicon();
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="flex-1 min-h-screen bg-blue-50/30 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <div className="flex">
              <Sidebar />
              <main className="container mx-auto px-4 py-8 no-scrollbar">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route
                    path="/projects/:projectId"
                    element={<ProjectDetails />}
                  />
                  <Route path="/myposts" element={<MyPosts />} />
                  <Route path="/myposts/:postId" element={<MyPostPage />} />
                  <Route path="/topics" element={<Topics />} />
                  <Route path="/experts" element={<TopExperts />} />
                  <Route path="/saved" element={<Saved />} />
                  <Route path="/profile" element={<MyProfile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route path="/expertProfile" element={<Profile />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
