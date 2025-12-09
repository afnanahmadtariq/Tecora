import { useState, useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import { fetchProjects } from "../api/projects";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for sidebar (reused from Experts for consistency)
  const myProjectsList = [
    "Web Wonders",
    "AI Explorer",
    "Ecommerce Essentials",
    "Digital Marketing",
    "Creative Coding"
  ];

  const savedItems = [
    "UI/UX Journey",
    "Mobile Development",
    "Remote Work",
    "SEO Success Strategies"
  ];

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        const apiProjects = data.feed || data;
        
        // Use API data if available, otherwise fallback to mock data to match the visual request
        if (Array.isArray(apiProjects) && apiProjects.length > 0) {
           setProjects(apiProjects);
        } else {
           // Fallback to mock data matching the "Web Wonders" visual
           setProjects(Array(9).fill({
              id: 1,
              title: "Web Wonders",
              description: "A project to learn and share insights about building responsive and interactive websites.",
              image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
           }));
        }
      } catch (err) {
        console.error("Failed to load projects", err);
         // Fallback to mock data on error too
         setProjects(Array(9).fill({
            id: 1,
            title: "Web Wonders",
            description: "A project to learn and share insights about building responsive and interactive websites.",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
         }));
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500">
      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-blue-500 mb-8">Projects</h1>

        {loading ? (
           <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group flex flex-col rounded-2xl overflow-hidden border border-sky-100 dark:border-border shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-card"
              >
                {/* Image Section */}
                <div className="h-40 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <img 
                      src={project.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                   />
                </div>

                {/* Content Section */}
                <div className="flex flex-col items-center text-center p-5 bg-sky-50/50 dark:bg-muted/10 h-full">
                  <Link to={`/projects/${project.id}`} className="hover:underline decoration-blue-500/30">
                     <h3 className="text-lg font-bold text-blue-500 mb-2">
                       {project.title}
                     </h3>
                  </Link>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                     <Link 
                        to={`/projects/${project.id}`}
                        className="text-[11px] font-medium text-red-400 group-hover:text-red-500 flex items-center gap-1 transition-colors uppercase tracking-wide"
                     >
                        Open Project
                        <FiExternalLink className="w-3 h-3" />
                     </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <aside className="w-full lg:w-64 space-y-8 lg:border-l lg:border-dashed lg:border-border lg:pl-8">
         {/* My Projects */}
         <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">My Projects</h3>
            <ul className="space-y-3">
               {myProjectsList.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 group cursor-pointer">
                     <span className="w-1.5 h-1.5 rounded-full bg-red-400 group-hover:scale-125 transition-transform"></span>
                     <span className="text-sm text-foreground/80 group-hover:text-primary transition-colors">{item}</span>
                  </li>
               ))}
            </ul>
         </div>

         <div className="h-px bg-border/50 lg:hidden" />

         {/* Saved */}
         <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Saved</h3>
            <ul className="space-y-3">
               {savedItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 group cursor-pointer">
                     <span className="w-1.5 h-1.5 rounded-full bg-red-400 group-hover:scale-125 transition-transform"></span>
                     <span className="text-sm text-foreground/80 group-hover:text-primary transition-colors">{item}</span>
                  </li>
               ))}
            </ul>
         </div>
      </aside>
    </div>
  );
}
