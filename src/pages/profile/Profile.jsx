import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FiExternalLink, FiUser, FiActivity, FiUsers } from "react-icons/fi";

const Profile = () => {
  const location = useLocation();
  const { expert } = location.state || { expert: { name: "Unknown User", specialization: "General", followers: 0, recommendations: 0 }};
  const [activeTab, setActiveTab] = useState("queries");

  // Mock data - in a real app this would come from an API based on expert ID
  const [posts] = useState([
    {
      id: 1,
      username: expert.name,
      title: "Developer at Comsats Uni",
      questiontitle: "What tools can help streamline project management for a remote team?",
      date: "Apr 20, 2024",
      description: "Looking for recommendations on project management tools suitable for remote teams.",
      tags: ["Project Management", "Remote Work", "Collaboration"],
      replies: [1, 2, 3], 
    },
    {
      id: 2,
      username: expert.name,
      title: "Developer at Comsats Uni",
      questiontitle: "What are the best strategies for staying productive while working remotely?",
      date: "Apr 22, 2024",
      description: "Looking for productivity strategies that work well for remote workers.",
      tags: ["Productivity", "Remote Work", "Work From Home"],
      replies: [1, 2, 3],
    },
    {
      id: 3,
      username: expert.name,
      title: "UI/UX Designer at Comsats Uni",
      questiontitle: "How do you ensure clear communication in a distributed team environment?",
      date: "Apr 25, 2024",
      description: "Looking for methods to improve communication in teams working remotely.",
      tags: ["Communication", "Distributed Teams", "Collaboration"],
      replies: [1, 2, 3],
    },
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Profile Header */}
      <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/10 shrink-0">
             <img 
               className="w-full h-full object-cover" 
               src="https://www.w3schools.com/w3images/avatar2.png" 
               alt={expert.name} 
             />
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
             <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{expert.name}</h1>
                <p className="text-lg text-primary font-medium">{expert.specialization}</p>
             </div>
             
             <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
                  <FiUsers className="w-4 h-4" />
                  <span className="font-semibold text-foreground">{expert.followers}m</span> Followers
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
                  <FiActivity className="w-4 h-4 text-orange-500" />
                  <span className="font-semibold text-foreground">{expert.recommendations}k</span> Recommendations
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {['queries', 'answers', 'projects'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm transition-all relative ${
              activeTab === tab 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="space-y-6">
         {activeTab === 'queries' && (
            <div className="grid gap-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.questiontitle}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                     <span className="text-sm text-muted-foreground">{post.date}</span>
                     <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        View Replies ({post.replies.length})
                        <FiExternalLink />
                     </button>
                  </div>
                </div>
              ))}
            </div>
         )}
         
         {activeTab === 'answers' && (
            <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-xl border border-dashed border-border">
               <p>No answers to display yet.</p>
            </div>
         )}

         {activeTab === 'projects' && (
            <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-xl border border-dashed border-border">
               <p>No projects to display yet.</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default Profile;
