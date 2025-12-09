"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

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
    <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-4">
        <img
          src={post["profile pic"] || "https://www.w3schools.com/w3images/avatar2.png"}
          alt={`${post.username}'s profile`}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-background"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground">
              {post.username}
            </span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-sm text-muted-foreground">
              {post.date}
            </span>
            {post.type !== "post" && (
              <>
                <span className="text-muted-foreground text-sm">·</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    post.type === "question"
                      ? post.solved
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                      : "bg-primary/10 text-primary"
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

          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <div className="text-muted-foreground mb-4 leading-relaxed">
            {needsReadMore && !isExpanded ? (
              <>
                {post.description.slice(0, descriptionLength)}...
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-primary hover:underline ml-1 font-medium"
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
                        ? "border-primary/50 bg-primary/5"
                        : "border-border bg-muted/30"
                    } transition-colors`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 rounded-l-lg transition-all duration-500 ${
                        isWinning ? "bg-primary/10" : "bg-muted"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="relative flex justify-between text-sm font-medium">
                      <span>{option.option}</span>
                      <span>{Math.round(percentage)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {(post.community || post.project) && (
            <div className="flex gap-2 mb-4 text-xs text-muted-foreground">
              {post.community && <span className="px-2 py-1 bg-muted rounded-md">Community: {post.community}</span>}
              {post.project && <span className="px-2 py-1 bg-muted rounded-md">Project: {post.project}</span>}
            </div>
          )}

          <div className="flex items-center gap-6 pt-2 border-t border-border">
            <div className="flex items-center gap-1 bg-muted/50 rounded-md p-1">
              <button
                onClick={() => handleVote("up")}
                className={`p-1 rounded hover:bg-background ${
                  voted === "up" ? "text-primary" : "text-muted-foreground"
                } transition-colors`}
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <span className={`text-sm font-medium ${voted ? 'text-foreground' : 'text-muted-foreground'}`}>{post.upvotes}</span>
              <button
                onClick={() => handleVote("down")}
                className={`p-1 rounded hover:bg-background ${
                  voted === "down" ? "text-destructive" : "text-muted-foreground"
                } transition-colors`}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={() => onViewReplies(post.id)}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.replies} Replies</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
