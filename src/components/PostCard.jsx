"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle, X } from "lucide-react";

export function PostCard({ post, onViewReplies, onVote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [voted, setVoted] = useState(null);

  const descriptionLength = 250;
  const needsReadMore = post.description.length > descriptionLength;

  const handleVote = (type) => {
    if (voted === type) return;
    onVote(post.id, type);
    setVoted(type);
  };

  return (
    <div className="bg-[var(--accent-light)]  dark:bg-[var(--accent-dark)]  p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-4">
        <img
          // onClick={console.log("clicked!!!")}
          src={
            post.profilePic
              ? post.profilePic
              : "https://www.w3schools.com/w3images/avatar2.png"
          }
          alt={`${post.username}'s profile`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-[var(--primary-color-light)] dark:text-[var(--primary-color-dark)] ">
              {post.username}
            </span>
            <span className="text-sm text-gray-500">·</span>
            <span className="text-sm text-[var(--p-light)] dark:text-[var(--p-dark)] text-gray-500">
              {post.date}
            </span>
            {post.type !== "post" && (
              <>
                <span className="text-sm text-gray-500">·</span>
                <span
                  className={`text-sm px-2 py-0.5 rounded ${
                    post.type === "question"
                      ? post.solved
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {post.type === "question"
                    ? post.solved
                      ? "Solved"
                      : "Open Question"
                    : "Poll"}
                </span>
              </>
            )}
          </div>

          <h3 className="text-lg text-[var(--text-light)] dark:text-[var(--text-dark)] font-medium mb-2">
            {post.title}
          </h3>

          <div className="text-[var(--p-light)] dark:text-[var(--p-dark)] mb-4">
            {needsReadMore && !isExpanded ? (
              <>
                {post.description.slice(0, descriptionLength)}...
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-blue-500 hover:text-blue-600 ml-1"
                >
                  read more
                </button>
              </>
            ) : (
              post.description
            )}
          </div>

          {post.type === "poll" && post.options && (
            <div className="space-y-2 mb-4">
              {post.options.map((option, index) => {
                const totalVotes = post.options.reduce(
                  (acc, curr) => acc + curr.votes,
                  0
                );
                const percentage =
                  totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                const isWinning =
                  percentage ===
                  Math.max(
                    ...post.options.map((o) => (o.votes / totalVotes) * 100)
                  );

                return (
                  <div
                    key={index}
                    className={`relative p-3 rounded-lg border ${
                      isWinning
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 ${
                        isWinning ? "bg-blue-100" : "bg-gray-100"
                      } rounded-lg transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="relative flex justify-between">
                      <span>{option.option}</span>
                      <span>{Math.round(percentage)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {(post.community || post.project) && (
            <div className="flex gap-2 mb-4 text-sm text-gray-500">
              {post.community && <span>Community: {post.community}</span>}
              {post.project && <span>Project: {post.project}</span>}
            </div>
          )}

          <div className="text-[var(--p-light)] dark:text-[var(--p-dark)]  flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleVote("up")}
                className={`p-1 rounded hover:bg-gray-100 ${
                  voted === "up" ? "text-blue-500" : "text-gray-500"
                }`}
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <span className="text-sm">{post.upvotes}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleVote("down")}
                className={`p-1 rounded hover:bg-gray-100 ${
                  voted === "down" ? "text-red-500" : "text-gray-500"
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
              <span className="text-sm">{post.downvotes}</span>
            </div>
            <button
              onClick={() => onViewReplies(post.id)}
              className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{post.replies}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
