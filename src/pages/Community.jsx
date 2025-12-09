import { useState } from 'react';
import { FiUsers, FiMessageSquare, FiHash, FiTrendingUp } from 'react-icons/fi';

export default function Community() {
  const [activeTab, setActiveTab] = useState('discussions');

  const communities = [
    {
      id: 1,
      name: "Web Development",
      members: "125k",
      description: "Everything about web dev, frontend, backend, and fullstack.",
      icon: "💻",
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      id: 2,
      name: "UI/UX Design",
      members: "85k",
      description: "Share designs, get feedback, and discuss user experience.",
      icon: "🎨",
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      id: 3,
      name: "Machine Learning",
      members: "62k",
      description: "Discuss AI, ML models, and data science trends.",
      icon: "🤖",
      color: "bg-green-500/10 text-green-500"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Community</h1>
          <p className="text-muted-foreground mt-1">Connect with developers and designers worldwide.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm">
          Create Community
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
                <FiUsers className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-sm text-muted-foreground">Total Members</p>
                 <h3 className="text-2xl font-bold">2.5M+</h3>
              </div>
           </div>
        </div>
        <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-lg">
                <FiMessageSquare className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-sm text-muted-foreground">Daily Discussions</p>
                 <h3 className="text-2xl font-bold">15k+</h3>
              </div>
           </div>
        </div>
        <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 text-orange-500 rounded-lg">
                <FiTrendingUp className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-sm text-muted-foreground">Active Now</p>
                 <h3 className="text-2xl font-bold">450k</h3>
              </div>
           </div>
        </div>
      </div>

      {/* Featured Communities */}
      <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
           <h2 className="text-xl font-semibold">Featured Communities</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
           {communities.map((community) => (
              <div key={community.id} className="group p-6 rounded-xl border border-border bg-card hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
                  <div className="flex items-start justify-between mb-4">
                     <span className={`text-4xl p-3 rounded-xl ${community.color} group-hover:scale-110 transition-transform`}>
                        {community.icon}
                     </span>
                     <button className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                        Join
                     </button>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{community.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                     {community.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                     <FiUsers className="w-3.5 h-3.5" />
                     {community.members} Members
                  </div>
              </div>
           ))}
        </div>
      </div>
      
      {/* Discussions Feed Placeholder */}
      <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-8 text-center">
         <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
               <FiHash className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Start a Discussion</h3>
            <p className="text-muted-foreground">
               Join the conversation. Share your thoughts, ask questions, or help others in the community.
            </p>
            <button className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
               Explore Topics
            </button>
         </div>
      </div>

    </div>
  );
}
