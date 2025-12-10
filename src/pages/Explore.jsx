'use client'

import { useEffect, useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { fetchPosts, fetchReplies, sendReply } from "../api/posts";

// Mock data for right sidebar (Static for now as no API endpoint exists)
const trendyTopics = [
  "Programming",
  "Digital Marketing",
  "Artificial intelligence",
  "Web Development",
  "UI/UX trends"
]

const specializedItems = [
  "Website designing",
  "Mockups",
  "React Development",
  "wordpress"
]

export default function Explore() {
  const [replies, setReplies] = useState([]) 
  const [loading, setLoading] = useState(true);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData || []);
      } catch (err) {
        console.log('Failed to load feed.', err);
        setPosts([]); // No fallback to mock
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const updateSelectedPost = (postId) => {
    const post = posts.find((p) => p.id === postId);
    setSelectedPost(post);
    if(post) refreshReplies(postId);
  };

  const refreshReplies = async(postId) => {
    setLoadingReplies(true);
    try {
       const repliesData = await fetchReplies(postId);
       setReplies(repliesData || []);
    } catch (err) {
      console.log('Failed to load replies.', err);
      setReplies([]);
    } finally {
      setLoadingReplies(false);
    }
  }

  const handleViewReplies = (postId) => {
    updateSelectedPost(postId);
  }

  const submitReply = async (postId) => {
    if (replyText.trim()) {
      setReplyLoading(true);
      try {
        await sendReply(postId, replyText.trim());
        setReplyText("");
        refreshReplies(postId); // Re-fetch to see new reply
      } catch (err) {
        console.error("Failed to submit reply", err);
      } finally {
        setReplyLoading(false);
      }
    }
  };

  if (loading) {
     return (
        <div className="flex items-center justify-center min-h-[50vh]">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
     );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500">
      
      {/* Main Feed */}
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold text-blue-500 mb-6">Explore</h1>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <div 
               key={index} 
               className="bg-white dark:bg-card border border-blue-100 dark:border-border rounded-xl p-6 hover:shadow-md transition-all duration-300"
            >
               {/* Header */}
               <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0">
                     <img 
                        src={post.profilePic || "https://www.w3schools.com/w3images/avatar2.png"} 
                        alt={post.username} 
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-900 shadow-sm"
                     />
                  </div>
                  <div>
                     <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 transition-colors cursor-pointer">{post.username}</span>
                        <span className="text-xs text-gray-400">• {post.date || "Just now"}</span>
                     </div>
                     <p className="text-sm text-gray-500 dark:text-gray-400">{post.designation || "Member"}</p>
                  </div>
               </div>

               {/* Content */}
               <h3 
                  onClick={() => handleViewReplies(post.id)}
                  className="text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-snug cursor-pointer hover:text-blue-600 transition-colors"
               >
                  {post.title}
               </h3>

               {/* Tags */}
               <div className="flex flex-wrap gap-2 mb-6">
                  {(post.tags || ["General"]).map((tag, i) => (
                     <span 
                        key={i} 
                        className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30 rounded-full"
                     >
                        {tag}
                     </span>
                  ))}
               </div>

               {/* Footer */}
               <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-full">
                     {post.replies || 0} Replies
                  </span>
                  
                  <button 
                     onClick={() => handleViewReplies(post.id)}
                     className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition-colors bg-red-50 dark:bg-red-900/10 px-3 py-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                     View Replies
                     <FiExternalLink className="w-3.5 h-3.5" />
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Dynamic Content */}
      <aside className="w-full lg:w-96 space-y-8 lg:border-l lg:border-dashed lg:border-gray-200 dark:border-gray-700 lg:pl-8 transition-all duration-300">
         
         {selectedPost ? (
            <div className="sticky top-20 flex flex-col h-[calc(100vh-6rem)] animate-in slide-in-from-right-10 duration-300">
               {/* Selected Post Header in Sidebar */}
               <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                     <img 
                        src={selectedPost.profilePic || "https://www.w3schools.com/w3images/avatar2.png"} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover"
                     />
                     <div>
                        <p className="text-xs text-blue-500 font-semibold">{selectedPost.date || "Just now"}</p>
                     </div>
                  </div>
                  <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 leading-snug">
                     {selectedPost.title}
                  </h3>
               </div>

               {/* Replies List */}
               <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                  {loadingReplies ? (
                     <div className="flex justify-center p-4">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                     </div>
                  ) : replies.length > 0 ? (
                     replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3 relative group">
                           {/* Thread line */}
                           <div className="absolute top-10 left-4 w-px h-[calc(100%+1.5rem)] bg-gray-100 dark:bg-gray-800 last:hidden"></div>
                           
                           <img 
                              src={reply.profilePic || "https://www.w3schools.com/w3images/avatar2.png"} 
                              alt="User" 
                              className="w-8 h-8 rounded-full object-cover shrink-0 z-10 ring-2 ring-white dark:ring-gray-900"
                           />
                           
                           <div className="flex-1 pb-4">
                              <p className="text-xs text-gray-500 mb-1">{reply.username || "User"}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg rounded-tl-none">
                                 {reply.text}
                              </p>
                              
                              <div className="flex items-center gap-4 mt-2">
                                 <div className="flex items-center gap-1 text-[10px] text-blue-500 font-medium cursor-pointer hover:bg-blue-50 px-1.5 py-0.5 rounded transition-colors">
                                    <span className="text-xs">⬆</span>
                                    <span>{reply.upvotes || "12k"}</span>
                                 </div>
                                 <div className="flex items-center gap-1 text-[10px] text-red-500 font-medium cursor-pointer hover:bg-red-50 px-1.5 py-0.5 rounded transition-colors">
                                    <span className="text-xs">⬇</span>
                                    <span>{reply.downvotes || "1.4k"}</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className="text-center text-sm text-gray-400 py-10">No replies yet. Be the first!</div>
                  )}
               </div>

               {/* Reply Input */}
               <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 bg-background">
                  <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                     <div className="text-gray-400 mr-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                     </div>
                     <input 
                        type="text" 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submitReply(selectedPost.id)}
                        placeholder="Reply..." 
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
                     />
                     <button 
                        onClick={() => submitReply(selectedPost.id)}
                        disabled={!replyText.trim() || replyLoading}
                        className="ml-2 text-blue-500 hover:text-blue-600 disabled:opacity-50"
                     >
                        <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                     </button>
                  </div>
               </div>
            </div>
         ) : (
            <>
               {/* Trendy Topics */}
               <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Trendy topics</h3>
                  <ul className="space-y-4">
                     {trendyTopics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2 group cursor-pointer">
                           <span className="w-1.5 h-1.5 rounded-full bg-red-400 group-hover:scale-125 transition-transform"></span>
                           <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors">{topic}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="h-px bg-gray-200/60 dark:bg-gray-700/60" />

               {/* Specialized for you */}
               <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Specialized for you</h3>
                  <ul className="space-y-4">
                     {specializedItems.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 group cursor-pointer">
                           <span className="w-1.5 h-1.5 rounded-full bg-red-400 group-hover:scale-125 transition-transform"></span>
                           <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors">{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            </>
         )}
      </aside>

    </div>
  )
}
