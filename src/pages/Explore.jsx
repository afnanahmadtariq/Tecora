'use client'

import { useEffect, useState } from 'react'
import { PostCard } from '../components/PostCard'
import { X, MessageCircle, Send } from 'lucide-react'
import { fetchPosts, fetchReplies, sendReply } from "../api/posts";

export default function Explore() {
  const [selectedPost, setSelectedPost] = useState(null)
  const [posts, setPosts] = useState([])
  const [replies, setReplies] = useState([]) 
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts || []);
      } catch (err) {
        console.log('Failed to load feed.', err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const updateSelectedPost = (postId) => {
    setSelectedPost(posts.find((post) => post.id === postId));
  };

  const submitReply = async (postId) => {
    if (replyText.trim()) {
      setReplyLoading(true);
      try {
        await sendReply(postId, replyText.trim());
        setReplyText("");
        refreshReplies(postId);
      } catch (err) {
        console.error("Failed to submit reply", err);
      } finally {
        setReplyLoading(false);
      }
    }
  };

  const refreshReplies = async(postId) => {
    try {
      const replies = await fetchReplies(postId);
      setReplies(replies || []);
    } catch (err) {
      console.log('Failed to load replies.', err);
    }
  }

  const handleViewReplies = (postId) => {
    updateSelectedPost(postId);
    refreshReplies(postId);
  }

  const handleCloseReplies = () => {
    setSelectedPost(null)
    setReplies([]);
  }

  // Placeholder vote handler
  const handleVote = (postId, type) => {
    // Optimistic update could go here
    console.log(`Voted ${type} on ${postId}`);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto transition-all duration-300">
      <div className={`grid gap-6 transition-all duration-300 ${selectedPost ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
        
        {/* Posts Feed */}
        <div className={`space-y-6 ${selectedPost ? 'lg:col-span-2' : ''}`}>
           <div className="flex items-center justify-between mb-2">
             <h1 className="text-3xl font-bold tracking-tight text-foreground">Explore</h1>
           </div>
          
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onViewReplies={handleViewReplies}
                onVote={handleVote}
              />
            ))}
          </div>
        </div>

        {/* Replies Sidebar */}
        {selectedPost && (
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-card border border-border rounded-xl shadow-lg flex flex-col h-[calc(100vh-6rem)] overflow-hidden animate-in slide-in-from-right-10 duration-300">
              
              {/* Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                <div>
                   <h2 className="font-semibold text-foreground">Replies</h2>
                   <p className="text-xs text-muted-foreground truncate max-w-[200px]">{selectedPost.title}</p>
                </div>
                <button
                  onClick={handleCloseReplies}
                  className="p-2 hover:bg-accent rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Replies List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {replies.length > 0 ? (
                  replies.map((reply) => (
                    <div key={reply.id} className="group flex gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <img
                        src={reply.profilePic || "https://www.w3schools.com/w3images/avatar2.png"}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-border"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{reply.username || "User"}</span>
                          <span className="text-xs text-muted-foreground">{reply.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                          {reply.text}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-2 opacity-50">
                    <MessageCircle className="w-12 h-12" />
                    <p>No replies yet</p>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-muted/30 border-t border-border mt-auto">
                 <div className="relative flex items-center">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && submitReply(selectedPost.id)}
                      placeholder="Write a reply..."
                      disabled={replyLoading}
                      className="w-full pl-4 pr-12 py-3 bg-background border border-border rounded-full text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                    />
                    <button 
                       onClick={() => submitReply(selectedPost.id)}
                       disabled={!replyText.trim() || replyLoading}
                       className="absolute right-2 p-1.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                       <Send className="w-4 h-4 ml-0.5" />
                    </button>
                 </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}




// import React, { useEffect, useState } from "react";
// import { fetchPosts, fetchReplies } from "../api/posts";

// export default function Explore() {
//   const [posts, setPosts] = useState([]);
//   const [replies, setReplies] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [replyText, setReplyText] = useState("");
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [votedPosts, setVotedPosts] = useState({}); // To track which post has been upvoted/downvoted

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const posts = await fetchPosts();
//         console.log(posts)
//         setPosts(posts);
//       } catch (err) {
//         console.log('Failed to load feed. Please try again later.', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetch();
//   }, []);


//   // Handle voting (upvote or downvote)
//   const handleVote = async (postId, voteType) => {
//     try {
//       // Ensure the user can only vote once per post
//       if (votedPosts[postId]) {
//         alert('You have already voted on this post.');
//         return;
//       }

//       // Send the vote to the backend
//       const response = await fetch('/api/vote', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ postId, voteType }),
//       });

//       if (response.ok) {
//         // Update the local state to reflect the user's vote
//         setVotedPosts((prevVotes) => ({
//           ...prevVotes,
//           [postId]: voteType,
//         }));
//       } else {
//         alert('Failed to submit your vote');
//       }
//     } catch (error) {
//       console.error('Error voting:', error);
//       alert('Error voting. Please try again later.');
//     }
//   };

//   const handlePostVote = (postId, voteType) => {
//     setPosts(
//       posts.map((post) => {
//         if (post.id === postId) {
//           if (
//             voteType === "upvote" &&
//             post.upvotes < post.downvotes + post.upvotes + 1
//           ) {
//             return { ...post, upvotes: post.upvotes + 1 };
//           } else if (
//             voteType === "downvote" &&
//             post.downvotes < post.upvotes + post.downvotes + 1
//           ) {
//             return { ...post, downvotes: post.downvotes + 1 };
//           }
//         }
//         return post;
//       })
//     );
//     updateSelectedPost(postId);
//   };

//   const handleReplyVote = (postId, replyId, voteType) => {
//     setPosts(
//       posts.map((post) => {
//         if (post.id === postId) {
//           const updatedReplies = post.replies.map((reply) => {
//             if (reply.id === replyId) {
//               if (
//                 voteType === "upvote" &&
//                 reply.upvotes < reply.downvotes + reply.upvotes + 1
//               ) {
//                 return { ...reply, upvotes: reply.upvotes + 1 };
//               } else if (
//                 voteType === "downvote" &&
//                 reply.downvotes < reply.upvotes + reply.downvotes + 1
//               ) {
//                 return { ...reply, downvotes: reply.downvotes + 1 };
//               }
//             }
//             return reply;
//           });
//           return { ...post, replies: updatedReplies };
//         }
//         return post;
//       })
//     );
//     updateSelectedPost(postId);
//   };

//   const handleReply = (postId, username = "") => {
//     setSelectedPost(posts.find((post) => post.id === postId));
//     setReplyingTo(postId);
//     setReplyText(username ? `@${username} ` : "");
//   };

//   const submitReply = (postId) => {
//     if (replyText.trim()) {
//       setPosts(
//         posts.map((post) => {
//           if (post.id === postId) {
//             const newReply = {
//               id: post.replies.length + 1,
//               text: replyText,
//               time: "Just now",
//               upvotes: 0,
//               downvotes: 0,
//               username: "currentUser", // Replace with actual username when implemented
//             };
//             return { ...post, replies: [...post.replies, newReply] };
//           }
//           return post;
//         })
//       );
//       setReplyText("");
//       setReplyingTo(null);
//       updateSelectedPost(postId);
//     }
//   };

//   const updateSelectedPost = (postId) => {
//     setSelectedPost(posts.find((post) => post.id === postId));
//     const fetch = async () => {
//       try {
//         const replies = await fetchReplies(postId);
//         setReplies(replies);
//       } catch (err) {
//         console.log('Failed to load replies. Please try again later.', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetch();
//   };


//   if (loading) {
//     return <p>Loading feed...</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* Left Section: Posts */}
//         <div className="lg:col-span-3">
//       <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">
//         Explore
//       </h1>
//       <div className="space-y-4">
//         {posts && posts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 {/* Profile Picture and Username */}
//                 <div className="flex items-center space-x-3 mb-4">
//                   {post.profilePic && (
//                     <img
//                       src={post.profilePic}
//                       alt={`${post.username}'s profile`}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   )}
//                   <span className="font-medium text-gray-900 dark:text-white">
//                     {post.username}
//                   </span>
//                 </div>

//                 {/* Post Date */}
//                 <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>

//                 {/* Post Title */}
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white my-2">
//                   {post.title}
//                 </h3>

//                 {/* Post Description */}
//                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.description}</p>

//                 {/* Tags (If any) */}
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {post.tags && post.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Post Interaction Section */}
//                 <div className="flex items-center space-x-4 mb-4">
//                   {/* Upvote Button */}
//                   <button
//                     onClick={() => handleVote(post.id, 'upvote')}
//                     disabled={votedPosts[post.id] === 'upvote'}
//                     className={`flex items-center space-x-1 ${votedPosts[post.id] === 'upvote' ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500 transition duration-200`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                     <span>{post.upvotes}</span>
//                   </button>

//                   {/* Downvote Button */}
//                   <button
//                     onClick={() => handleVote(post.id, 'downvote')}
//                     disabled={votedPosts[post.id] === 'downvote'}
//                     className={`flex items-center space-x-1 ${votedPosts[post.id] === 'downvote' ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition duration-200`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                     <span>{post.downvotes}</span>
//                   </button>

//                   {/* Reply Button */}
//                   <button
//                     onClick={() => handleReply(post.id)}
//                     className="text-gray-500 hover:text-green-500 transition duration-200"
//                   >
//                     Reply
//                   </button>
                  
//                   {/* View Replies Button */}
//                   <button
//                     onClick={() => setSelectedPost(post)}
//                     className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600"
//                   >
//                     View Replies
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                 </div>

//                 {/* Project ID and Community ID (If needed) */}
//                 {post.projectId && (
//                   <div className="text-sm text-gray-600 dark:text-gray-300">
//                     <span className="font-semibold">Project ID: </span>{post.projectId}
//                   </div>
//                 )}
//                 {post.communityId && (
//                   <div className="text-sm text-gray-600 dark:text-gray-300">
//                     <span className="font-semibold">Community ID: </span>{post.communityId}
//                   </div>
//                 )}

//                 {/* Replies Count */}
//                 <div className="text-sm text-gray-600 dark:text-gray-300 mt-4">
//                   <span className="font-semibold">Replies: </span>{post.replies}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>


//         {/* Right Section: Replies */}
//         {replies &&
//         <div
//           className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors duration-200 sticky top-24 py-4 flex flex-col justify-between overflow-hidden"
//           style={{ maxHeight: "calc(100vh - 6rem)" }}
//         >
//           {selectedPost && (
//             <>
//               {/* Header Section */}
//               <div className="p-6 border-b">
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
//                   {selectedPost.date}
//                 </p>
//                 <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   {selectedPost.title}
//                 </h2>
//               </div>

//               {/* Reply List */}
//               <div className="flex-1 overflow-auto p-6 space-y-4">
//                 {replies.map((reply) => (
//                   <div
//                     key={reply.id}
//                     className="flex items-start border-b pb-4 last:border-b-0"
//                   >
//                     {/* Profile Icon */}
//                     <a
//                       href="#"
//                       className="hover:scale-105 transition-transform duration-200 mr-3"
//                     >
//                       <img
//                         src="https://via.placeholder.com/32"
//                         alt="Profile"
//                         className="w-8 h-8 rounded-full cursor-pointer"
//                       />
//                     </a>

//                     {/* Reply Content */}
//                     <div className="flex-1">
//                       <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
//                         {reply.text}
//                       </p>
//                       <div className="flex items-center text-xs text-gray-400 space-x-4">
//                         <span>{reply.time}</span>
//                         <button
//                           onClick={() =>
//                             handleReplyVote(
//                               selectedPost.id,
//                               reply.id,
//                               "upvote"
//                             )
//                           }
//                           className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition duration-200"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                           <span>{reply.upvotes}</span>
//                         </button>
//                         <button
//                           onClick={() =>
//                             handleReplyVote(
//                               selectedPost.id,
//                               reply.id,
//                               "downvote"
//                             )
//                           }
//                           className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition duration-200"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                           <span>{reply.downvotes}</span>
//                         </button>
//                         <button
//                           onClick={() =>
//                             handleReply(selectedPost.id, reply.username)
//                           }
//                           className="text-gray-500 hover:text-green-500 transition duration-200"
//                         >
//                           Reply
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Reply Input */}
//               <div className="p-4 border-t">
//                 <div className="flex items-center">
//                   <input
//                     type="text"
//                     value={replyText}
//                     onChange={(e) => setReplyText(e.target.value)}
//                     placeholder="Add your reply..."
//                     className="w-full p-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <button
//                     onClick={() => submitReply(selectedPost.id)}
//                     className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md flex items-center justify-center"
//                     title="Send Reply"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>}
//       </div>
//     </div>
//   );
// }
