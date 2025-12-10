import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPostById, fetchReplies } from '../api/posts'; 
import { FiArrowLeft, FiBold, FiUnderline, FiItalic, FiSend, FiThumbsUp, FiThumbsDown, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import clsx from 'clsx';

export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const [postData, repliesData] = await Promise.all([
          fetchPostById(postId),
          fetchReplies(postId) // Fetching replies separately
        ]);
        
        setPost(postData);
        setReplies(repliesData || []); // Ensure array
      } catch (err) {
        console.error("Failed to fetch post data:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [postId]);

  const toggleExpand = (id) => {
    setReplies(replies.map(r => r.id === id ? { ...r, isExpanded: !r.isExpanded } : r));
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!post) return <div className="p-8 text-center">Post not found</div>;

  const tagsList = post.tags ? post.tags.split(',') : [];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors mb-2">
        <FiArrowLeft className="w-6 h-6" />
      </button>

      {/* Reply Input Section */}
      <div className="bg-white dark:bg-card border border-blue-100 dark:border-border rounded-xl p-6 shadow-sm">
        <div className="flex gap-4">
          <div className="shrink-0">
             <img src="https://i.pravatar.cc/150?u=me" alt="My Avatar" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
          </div>
          <div className="flex-1">
             <div className="relative">
               <textarea
                 value={replyText}
                 onChange={(e) => setReplyText(e.target.value)}
                 placeholder="Write you Reply here..."
                 className="w-full bg-gray-50 dark:bg-accent/50 border border-gray-200 dark:border-border rounded-lg p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"
               />
               
               {/* Toolbar & Action */}
               <div className="flex items-center justify-between mt-3 px-1">
                 <div className="flex items-center gap-2 text-gray-400">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"><FiBold className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"><FiUnderline className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"><FiItalic className="w-4 h-4" /></button>
                 </div>
                 
                 <button className="flex items-center gap-2 px-6 py-2 bg-red-50 text-red-500 font-medium rounded-full hover:bg-red-100 hover:scale-105 transition-all active:scale-95">
                   Post Answer
                   <FiSend className="w-4 h-4" />
                 </button>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-card border border-blue-100 dark:border-border rounded-xl p-8 shadow-sm">
        <div className="flex gap-4">
           <div className="shrink-0">
             <img src="https://i.pravatar.cc/150?u=author" alt="Author" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
           </div>
           <div className="space-y-4 flex-1">
             <div>
               <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-snug mb-2">
                 {post.title}
               </h1>
               <span className="text-xs font-medium text-gray-400">{new Date(post.date).toDateString()}</span>
             </div>
             
             <div className="flex flex-wrap gap-2">
               {tagsList.map(tag => (
                 <span key={tag} className="px-4 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30">
                   {tag.trim()}
                 </span>
               ))}
             </div>
           </div>
        </div>
      </div>

      {/* Replies Header & Filters */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Replies ({replies.length})</h2>
        <div className="flex gap-3">
           {['All', 'Accepted', 'Un Seen'].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={clsx(
                 "px-8 py-2 rounded-full text-sm font-medium transition-all border",
                 activeTab === tab 
                   ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30" 
                   : "bg-transparent text-gray-500 border-blue-200 dark:border-gray-700 hover:border-blue-400 hover:text-blue-500"
               )}
             >
               {tab}
             </button>
           ))}
        </div>

        {/* Replies List */}
        <div className="space-y-4">
          {replies.map((reply) => (
            <div key={reply.id} className="bg-white dark:bg-card border border-blue-50 dark:border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <img src={reply.author.avatar} alt={reply.author.name} className="w-10 h-10 rounded-full object-cover" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-blue-500 text-sm">{reply.author.name}</h3>
                    <span className="text-xs text-gray-400">• {reply.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-2">{reply.author.role}</p>
                  
                  <div className={`text-sm text-gray-600 dark:text-gray-300 leading-relaxed ${!reply.isExpanded && 'line-clamp-2'}`}>
                    {reply.content}
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-50 dark:border-gray-800/50">
                    <div className="flex gap-3">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-md hover:bg-blue-100 transition-colors">
                        <FiThumbsUp className="w-3.5 h-3.5" /> Up vote
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md hover:bg-red-100 transition-colors">
                        <FiThumbsDown className="w-3.5 h-3.5" /> Down Vote
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => toggleExpand(reply.id)}
                      className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
                    >
                      {reply.isExpanded ? 'Collapse' : 'Expand'}
                      {reply.isExpanded ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
