import React, { useState } from "react";
import { Modal } from "./Modal";
import { createPost } from "../api/posts";
import { FiImage, FiX } from "react-icons/fi";

export function PostModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("post");
  const [postContent, setPostContent] = useState(""); // Will map to 'description'
  const [mediaUrl, setMediaUrl] = useState("");
  const [title, setTitle] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    let postData;
    // Map internal state to API payload expected by PostCard (description, etc.)
    switch (activeTab) {
      case "post":
        postData = {
          type: "post",
          title: title.trim(),
          description: postContent.trim(), // API usually expects 'description' if PostCard reads 'description'
          media: mediaUrl, // Note: Local blob URL, see comment below
        };
        break;
      case "question":
        postData = {
          type: "question",
          title: title.trim(),
          description: postContent.trim(), // Reusing postContent for question details
        };
        break;
      case "poll":
        postData = {
          type: "poll",
          title: title.trim(),
          description: postContent.trim(), // Optional description for poll
          options: pollOptions.map(opt => ({ option: opt.trim(), votes: 0 })).filter(o => o.option !== ""),
        };
        break;
      default:
        setLoading(false);
        return;
    }

    try {
      const res = await createPost(postData);
      // Since createPost returns a Response object or null
      if (res && res.ok) {
        setSuccess("Post created successfully!");
        setTimeout(() => {
          setSuccess("");
          // Reset form
          setTitle("");
          setPostContent("");
          setMediaUrl("");
          setPollOptions(["", ""]);
          onClose();
        }, 1000);
      } else {
        setError("Failed to create post. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setMediaUrl(fileUrl);
    }
  };

  const removeMedia = () => {
     setMediaUrl("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full bg-background text-foreground rounded-lg overflow-hidden">
         {/* Header */}
         <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
               Create Post
            </h2>
            <button onClick={onClose} className="p-1 hover:bg-accent rounded-full transition-colors">
               <FiX className="w-5 h-5 text-muted-foreground" />
            </button>
         </div>

         {/* Tabs */}
         <div className="flex border-b border-border bg-muted/30">
            {["post", "question", "poll"].map((tab) => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm font-medium transition-all relative ${
                     activeTab === tab 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
               >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                     <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full mx-4" />
                  )}
               </button>
            ))}
         </div>

         {/* Content */}
         <div className="p-6 space-y-5">
            {/* Title Input */}
            <div>
               <label className="block text-sm font-medium text-muted-foreground mb-1.5">Title</label>
               <input
                  type="text"
                  placeholder="Give your post a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
               />
            </div>

            {/* Description Input */}
            <div>
               <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                  {activeTab === 'question' ? 'Details' : 'Description'}
               </label>
               <textarea
                  placeholder={activeTab === 'question' ? "Describe your question in detail..." : "What's on your mind?"}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full p-4 bg-background border border-input rounded-xl min-h-[140px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 resize-y"
               />
            </div>

            {/* Media Upload for Post */}
            {activeTab === "post" && (
               <div className="space-y-3">
                  <div className="flex items-center gap-4">
                     <label className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary text-secondary-foreground rounded-lg cursor-pointer transition-colors text-sm font-medium">
                        <FiImage className="w-4 h-4" />
                        <span>Add Media</span>
                        <input
                           type="file"
                           accept="image/*, video/*"
                           onChange={handleFileChange}
                           className="hidden"
                        />
                     </label>
                  </div>

                  {mediaUrl && (
                     <div className="relative rounded-xl overflow-hidden border border-border bg-black/5 group">
                        <button 
                           onClick={removeMedia}
                           className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        >
                           <FiX className="w-4 h-4" />
                        </button>
                        {mediaUrl.endsWith(".mp4") || mediaUrl.endsWith(".mov") ? (
                           <video controls className="w-full max-h-60 object-contain">
                              <source src={mediaUrl} type="video/mp4" />
                           </video>
                        ) : (
                           <img src={mediaUrl} alt="Preview" className="w-full max-h-60 object-contain" />
                        )}
                     </div>
                  )}
               </div>
            )}

            {/* Poll Options */}
            {activeTab === "poll" && (
               <div className="space-y-3">
                  <label className="block text-sm font-medium text-muted-foreground">Options</label>
                  {pollOptions.map((option, index) => (
                     <div key={index} className="flex gap-2">
                        <input
                           placeholder={`Option ${index + 1}`}
                           value={option}
                           onChange={(e) => {
                              const newOptions = [...pollOptions];
                              newOptions[index] = e.target.value;
                              setPollOptions(newOptions);
                           }}
                           className="flex-1 px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                        />
                     </div>
                  ))}
                  <button
                     onClick={addPollOption}
                     className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                     type="button"
                  >
                     + Add another option
                  </button>
               </div>
            )}

            {/* Status Messages */}
            {error && (
               <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg text-center">
                  {error}
               </div>
            )}
            {success && (
               <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm rounded-lg text-center">
                  {success}
               </div>
            )}

            {/* Footer Actions */}
            <div className="flex gap-3 pt-2">
               <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground font-medium transition-colors"
               >
                  Cancel
               </button>
               <button
                  onClick={handleSubmit}
                  disabled={loading || !title.trim()}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
               >
                  {loading ? (
                     <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Publishing...
                     </span>
                  ) : (
                     "Post"
                  )}
               </button>
            </div>
         </div>
      </div>
    </Modal>
  );
}
