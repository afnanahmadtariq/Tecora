import React, { useEffect, useState } from "react";
import { PostModal } from "../components/PostModal";
import Question from "../components/question/Question";
import { fetchPosts } from "../api/posts";
import { CloudCog } from "lucide-react";

export default function Explore() {
  // const [posts, setPosts] = useState([
  //   {
  //     id: 1,
  //     username: "afnan",
  //     title: "Developer at Comsats Uni",
  //     questiontitle:
  //       "What tools can help streamline project management for a remote team?",
  //     date: "Apr 20, 2024",
  //     description:
  //       "Looking for recommendations on project management tools suitable for remote teams.",
  //     tags: ["Project Management", "Remote Work", "Collaboration"],
  //     upvotes: 15,
  //     downvotes: 2,
  //     replies: [
  //       {
  //         id: 1,
  //         text: "Some tool can be used",
  //         time: "12m",
  //         upvotes: 14,
  //         downvotes: 0,
  //         username: "user1",
  //       },
  //       {
  //         id: 2,
  //         text: "Figma? or something...",
  //         time: "12m",
  //         upvotes: 8,
  //         downvotes: 1,
  //         username: "user2",
  //       },
  //       {
  //         id: 3,
  //         text: "Use whatever you like",
  //         time: "12m",
  //         upvotes: 5,
  //         downvotes: 2,
  //         username: "user3",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     username: "afnan",
  //     title: "Developer at Comsats Uni",
  //     questiontitle:
  //       "What are the best strategies for staying productive while working remotely?",
  //     date: "Apr 22, 2024",
  //     description:
  //       "Looking for productivity strategies that work well for remote workers.",
  //     tags: ["Productivity", "Remote Work", "Work From Home"],
  //     upvotes: 22,
  //     downvotes: 3,
  //     replies: [
  //       {
  //         id: 1,
  //         text: "Stick to a structured routine",
  //         time: "10m",
  //         upvotes: 10,
  //         downvotes: 0,
  //         username: "user4",
  //       },
  //       {
  //         id: 2,
  //         text: "Designate a specific workspace",
  //         time: "8m",
  //         upvotes: 7,
  //         downvotes: 1,
  //         username: "user5",
  //       },
  //       {
  //         id: 3,
  //         text: "Take regular breaks to maintain focus",
  //         time: "5m",
  //         upvotes: 5,
  //         downvotes: 2,
  //         username: "user6",
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     username: "aligee",
  //     title: "UI/UX Designer at Comsats Uni",
  //     questiontitle:
  //       "How do you ensure clear communication in a distributed team environment?",
  //     date: "Apr 25, 2024",
  //     description:
  //       "Looking for methods to improve communication in teams working remotely.",
  //     tags: ["Communication", "Distributed Teams", "Collaboration"],
  //     upvotes: 18,
  //     downvotes: 1,
  //     replies: [
  //       {
  //         id: 1,
  //         text: "Regular video meetings are crucial",
  //         time: "15m",
  //         upvotes: 11,
  //         downvotes: 0,
  //         username: "user7",
  //       },
  //       {
  //         id: 2,
  //         text: "Use communication tools like Slack or Microsoft Teams",
  //         time: "13m",
  //         upvotes: 6,
  //         downvotes: 1,
  //         username: "user8",
  //       },
  //       {
  //         id: 3,
  //         text: "Encourage transparent and frequent updates",
  //         time: "10m",
  //         upvotes: 4,
  //         downvotes: 0,
  //         username: "user9",
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     username: "aligee",
  //     title: "UI/UX Designer at Comsats Uni",
  //     questiontitle:
  //       "Which tools are essential for effective time tracking for freelancers?",
  //     date: "Apr 28, 2024",
  //     description:
  //       "Seeking recommendations for time tracking tools that are effective for freelancers.",
  //     tags: ["Time Tracking", "Freelancing", "Productivity Tools"],
  //     upvotes: 25,
  //     downvotes: 2,
  //     replies: [
  //       {
  //         id: 1,
  //         text: "Toggl Track is a great option",
  //         time: "14m",
  //         upvotes: 13,
  //         downvotes: 0,
  //         username: "user10",
  //       },
  //       {
  //         id: 2,
  //         text: "Clockify works well and has free options",
  //         time: "12m",
  //         upvotes: 8,
  //         downvotes: 1,
  //         username: "user11",
  //       },
  //       {
  //         id: 3,
  //         text: "RescueTime can track time spent on apps and websites",
  //         time: "10m",
  //         upvotes: 6,
  //         downvotes: 0,
  //         username: "user12",
  //       },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     username: "aligee",
  //     title: "UI/UX Designer at Comsats Uni",
  //     questiontitle:
  //       "What strategies do you use for team building in remote settings?",
  //     date: "Apr 30, 2024",
  //     description:
  //       "Looking for creative ideas to foster team building while working remotely.",
  //     tags: ["Team Building", "Remote Work", "Collaboration"],
  //     upvotes: 30,
  //     downvotes: 4,
  //     replies: [
  //       {
  //         id: 1,
  //         text: "Virtual team-building activities like online games",
  //         time: "15m",
  //         upvotes: 15,
  //         downvotes: 0,
  //         username: "user13",
  //       },
  //       {
  //         id: 2,
  //         text: "Organize regular virtual coffee breaks",
  //         time: "13m",
  //         upvotes: 9,
  //         downvotes: 1,
  //         username: "user14",
  //       },
  //       {
  //         id: 3,
  //         text: "Host workshops and skill-sharing sessions",
  //         time: "11m",
  //         upvotes: 6,
  //         downvotes: 3,
  //         username: "user15",
  //       },
  //     ],
  //   },
  // ]);

  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const posts = await fetchPosts();
        console.log(posts)
        setPosts(posts);
      } catch (err) {
        console.log('Failed to load feed. Please try again later.', err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const handlePostVote = (postId, voteType) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          if (
            voteType === "upvote" &&
            post.upvotes < post.downvotes + post.upvotes + 1
          ) {
            return { ...post, upvotes: post.upvotes + 1 };
          } else if (
            voteType === "downvote" &&
            post.downvotes < post.upvotes + post.downvotes + 1
          ) {
            return { ...post, downvotes: post.downvotes + 1 };
          }
        }
        return post;
      })
    );
    updateSelectedPost(postId);
  };

  const handleReplyVote = (postId, replyId, voteType) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const updatedReplies = post.replies.map((reply) => {
            if (reply.id === replyId) {
              if (
                voteType === "upvote" &&
                reply.upvotes < reply.downvotes + reply.upvotes + 1
              ) {
                return { ...reply, upvotes: reply.upvotes + 1 };
              } else if (
                voteType === "downvote" &&
                reply.downvotes < reply.upvotes + reply.downvotes + 1
              ) {
                return { ...reply, downvotes: reply.downvotes + 1 };
              }
            }
            return reply;
          });
          return { ...post, replies: updatedReplies };
        }
        return post;
      })
    );
    updateSelectedPost(postId);
  };

  const handleReply = (postId, username = "") => {
    setSelectedPost(posts.find((post) => post.id === postId));
    const fetch = async () => {
      try {
        const replies = await fetchReply();
        setReplies(replies);
      } catch (err) {
        console.log('Failed to load replies. Please try again later.', err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
    setReplyingTo(postId);
    setReplyText(username ? `@${username} ` : "");
  };

  const submitReply = (postId) => {
    if (replyText.trim()) {
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            const newReply = {
              id: post.replies.length + 1,
              text: replyText,
              time: "Just now",
              upvotes: 0,
              downvotes: 0,
              username: "currentUser", // Replace with actual username when implemented
            };
            return { ...post, replies: [...post.replies, newReply] };
          }
          return post;
        })
      );
      setReplyText("");
      setReplyingTo(null);
      updateSelectedPost(postId);
    }
  };

  const updateSelectedPost = (postId) => {
    setSelectedPost(posts.find((post) => post.id === postId));
  };

  const handleCreatePost = (postData) => {
    // Here you would typically send the post data to your backend
    // For now, we'll just add it to the local state
    const newPost = {
      id: posts.length + 1,
      title: postData.content,
      date: new Date().toLocaleDateString(),
      description: postData.content,
      tags: [],
      upvotes: 0,
      downvotes: 0,
      replies: [],
      ...postData,
    };
    setPosts([newPost, ...posts]);
  };

  if (loading) {
    return <p>Loading feed...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Section: Posts */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">
            Explore
          </h1>
          <div className="space-y-4">
            {posts? posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white my-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handlePostVote(post.id, 'upvote')}
                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{post.upvotes}</span>
                      </button>
                      <button
                        onClick={() => handlePostVote(post.id, 'downvote')}
                        className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{post.downvotes}</span>
                      </button>
                      <button
                        onClick={() => handleReply(post.id)}
                        className="text-gray-500 hover:text-green-500 transition duration-200"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600"
                      >
                        View Replies
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div> */}
                <Question handleReply={handleReply} post={post} />
              </div>
            )):
            <></>}
          </div>
        </div>

        {/* Right Section: Replies */}
        {posts?
        <div
          className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors duration-200 sticky top-24 py-4 flex flex-col justify-between overflow-hidden"
          style={{ maxHeight: "calc(100vh - 6rem)" }}
        >
          {selectedPost && (
            <>
              {/* Header Section */}
              <div className="p-6 border-b">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {selectedPost.date}
                </p>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedPost.title}
                </h2>
              </div>

              {/* Reply List */}
              <div className="flex-1 overflow-auto p-6 space-y-4">
                {selectedPost.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="flex items-start border-b pb-4 last:border-b-0"
                  >
                    {/* Profile Icon */}
                    <a
                      href="#"
                      className="hover:scale-105 transition-transform duration-200 mr-3"
                    >
                      <img
                        src="https://via.placeholder.com/32"
                        alt="Profile"
                        className="w-8 h-8 rounded-full cursor-pointer"
                      />
                    </a>

                    {/* Reply Content */}
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        {reply.text}
                      </p>
                      <div className="flex items-center text-xs text-gray-400 space-x-4">
                        <span>{reply.time}</span>
                        <button
                          onClick={() =>
                            handleReplyVote(
                              selectedPost.id,
                              reply.id,
                              "upvote"
                            )
                          }
                          className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{reply.upvotes}</span>
                        </button>
                        <button
                          onClick={() =>
                            handleReplyVote(
                              selectedPost.id,
                              reply.id,
                              "downvote"
                            )
                          }
                          className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{reply.downvotes}</span>
                        </button>
                        <button
                          onClick={() =>
                            handleReply(selectedPost.id, reply.username)
                          }
                          className="text-gray-500 hover:text-green-500 transition duration-200"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Input */}
              <div className="p-4 border-t">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Add your reply..."
                    className="w-full p-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => submitReply(selectedPost.id)}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md flex items-center justify-center"
                    title="Send Reply"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        :
        <></>}
      </div>
    </div>
  );
}
