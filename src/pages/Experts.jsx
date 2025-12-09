import { useState, useEffect } from "react";
import { FiExternalLink, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { fetchTopExperts } from "../api/experts";
import { Link } from "react-router-dom";

export default function ExpertsPage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for sidebar
  const myProjects = [
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
    const getExperts = async () => {
      try {
        const data = await fetchTopExperts();
        setExperts(Array.isArray(data.experts) ? data.experts : (Array.isArray(data) ? data : []));
      } catch (error) {
        console.error("Failed to load experts:", error);
        // Fallback mock data if API fails or is empty, to match the UI request visually immediately
        setExperts([
          { name: "Elon Musk", specialization: "AI Technologies and Machine Learning", followers: "12m", recommendations: "1.4k", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg" },
          { name: "Ali Jee", specialization: "AI Technologies and Machine Learning", followers: "12m", recommendations: "1.4k", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" },
          { name: "Genix", specialization: "AI Technologies and Machine Learning", followers: "12m", recommendations: "1.4k", avatar: "https://w0.peakpx.com/wallpaper/592/944/HD-wallpaper-anime-boy-anime-boy-anime-boys-cartoon-character-cartoon-characters-cool-cool-boy-cool-boys-cute-cute-boy-cute-boys-love.jpg" },
          { name: "Genix", specialization: "AI Technologies and Machine Learning", followers: "12m", recommendations: "1.4k", avatar: "https://w0.peakpx.com/wallpaper/592/944/HD-wallpaper-anime-boy-anime-boy-anime-boys-cartoon-character-cartoon-characters-cool-cool-boy-cool-boys-cute-cute-boy-cute-boys-love.jpg" },
          { name: "Elon Musk", specialization: "AI Technologies and Machine Learning", followers: "12m", recommendations: "1.4k", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg" },
          { name: "Ali Jee", specialization: "AI Technologies and Machine Learning", followers: "12m", recommendations: "1.4k", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" },
           { name: "Elon Musk", specialization: "AI Technologies and Machine Learning", followers: "12m", recommendations: "1.4k", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg" },
          { name: "Ali Jee", specialization: "AI Technologies and Machine Learning", followers: "12m", recommendations: "1.4k", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" },
          { name: "Genix", specialization: "AI Technologies and Machine Learning", followers: "12m", recommendations: "1.4k", avatar: "https://w0.peakpx.com/wallpaper/592/944/HD-wallpaper-anime-boy-anime-boy-anime-boys-cartoon-character-cartoon-characters-cool-cool-boy-cool-boys-cute-cute-boy-cute-boys-love.jpg" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    getExperts();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500">
      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-blue-500 mb-8">Top Experts of Tecora</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {experts.map((expert, index) => (
            <div
              key={index}
              className="bg-sky-50/50 dark:bg-card border border-sky-100 dark:border-border rounded-xl p-5 shadow-[0_2px_10px_-2px_rgba(56,189,248,0.1)] hover:shadow-md transition-all relative overflow-hidden group"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -mr-12 -mt-12 transition-all group-hover:bg-blue-500/10"></div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-2 z-10">
                  <h3 className="text-lg font-bold text-blue-500 group-hover:text-blue-600 transition-colors">
                    {expert.name}
                  </h3>
                  
                  <p className="text-[10px] leading-tight text-muted-foreground uppercase tracking-wide font-medium">
                    {expert.specialization}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground pt-1">
                    <div className="flex items-center gap-1 text-blue-500">
                      <FiArrowUp className="w-3 h-3" />
                      <span>{expert.followers}</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-500">
                      <FiArrowDown className="w-3 h-3" />
                      <span>{expert.recommendations}</span>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    state={{ expert }}
                    className="inline-flex items-center gap-1 text-[10px] text-red-400 font-medium hover:text-red-500 transition-colors mt-2"
                  >
                    Open Profile
                    <FiExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <div className="shrink-0 z-10">
                   <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-800 shadow-sm">
                      <img
                        src={expert.avatar}
                        alt={expert.name}
                        className="w-full h-full object-cover"
                      />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="w-full lg:w-64 space-y-8 lg:border-l lg:border-dashed lg:border-border lg:pl-8">
         {/* My Projects */}
         <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">My Projects</h3>
            <ul className="space-y-3">
               {myProjects.map((project, i) => (
                  <li key={i} className="flex items-center gap-2 group cursor-pointer">
                     <span className="w-1.5 h-1.5 rounded-full bg-red-400 group-hover:scale-125 transition-transform"></span>
                     <span className="text-sm text-foreground/80 group-hover:text-primary transition-colors">{project}</span>
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
