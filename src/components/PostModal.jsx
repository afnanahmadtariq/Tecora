import React, { useState } from "react";
import { Modal } from "./Modal";
import { createPost } from "../api/posts";

export function PostModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("post");
  const [postContent, setPostContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    let postData;
    switch (activeTab) {
      case "post":
        postData = {
          type: "post",
          title: title.trim(),
          content: postContent.trim(),
          media: mediaUrl,
        };
        break;
      case "question":
        postData = {
          type: "question",
          title: title.trim(),
          content: question.trim(),
        };
        break;
      case "poll":
        postData = {
          type: "poll",
          title: title.trim(),
          options: pollOptions.map(opt => opt.trim()).filter(opt => opt !== ""),
        };
        break;
      default:
        setLoading(false);
        return;
    }
    try {
      const res = await createPost(postData);
      if (res && res.ok) {
        setSuccess("Post created successfully!");
        setTimeout(() => {
          setSuccess("");
          onClose();
        }, 1000);
      } else {
        setError("Failed to create post. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
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
      const fileUrl = URL.createObjectURL(file); // Create an object URL for the file
      setMediaUrl(fileUrl);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setMediaUrl(fileUrl);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior to allow drop
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl dark:text-[var(--text-dark)] text-[var(--text-light)] font-bold mb-4">
        Create a {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h2>
      <div className="mb-4">
        <div className="flex border-b text-[var(--text-light)] dark:text-[var(--text-dark)]">
          <button
            className={`py-2 px-4 focus:outline-none ${activeTab === "post" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            aria-pressed={activeTab === "post"}
            onClick={() => setActiveTab("post")}
          >
            Post
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${activeTab === "question" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            aria-pressed={activeTab === "question"}
            onClick={() => setActiveTab("question")}
          >
            Question
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${activeTab === "poll" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            aria-pressed={activeTab === "poll"}
            onClick={() => setActiveTab("poll")}
          >
            Poll
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-[var(--accent-dark)]"
          aria-label="Title"
        />
      </div>
      {activeTab === "post" && (
        <div className="space-y-4">
          <textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full p-2 border rounded min-h-[100px] bg-white dark:bg-[var(--accent-dark)]"
            aria-label="Post content"
          />
          <div
            className="w-full p-4 border rounded border-dashed"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-center text-gray-600">
              Drag & drop an image/video or click to select
            </p>
            <input
              type="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer w-full text-center"
            >
              <span
                role="img"
                aria-label="camera"
                className="block text-3xl text-gray-500"
              >
                📸
              </span>
              <p className="text-center text-gray-600">Add Image/Video</p>
            </label>
            {mediaUrl && (
              <div className="mt-4">
                <p>Media Preview:</p>
                {mediaUrl.endsWith(".mp4") || mediaUrl.endsWith(".mov") ? (
                  <video controls className="w-full mt-2">
                    <source src={mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={mediaUrl} alt="Preview" className="w-full mt-2" />
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {activeTab === "question" && (
        <div className="space-y-4">
          <textarea
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded min-h-[100px]"
            aria-label="Question content"
          />
        </div>
      )}
      {activeTab === "poll" && (
        <div className="space-y-4">
          {pollOptions.map((option, index) => (
            <input
              key={index}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...pollOptions];
                newOptions[index] = e.target.value;
                setPollOptions(newOptions);
              }}
              className="w-full p-2 border rounded"
              aria-label={`Poll option ${index + 1}`}
            />
          ))}
          <button
            onClick={addPollOption}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            type="button"
          >
            Add Option
          </button>
        </div>
      )}
      {error && (
        <div className="w-full mt-2 text-red-600 text-center">{error}</div>
      )}
      {success && (
        <div className="w-full mt-2 text-green-600 text-center">{success}</div>
      )}
      <button
        onClick={handleSubmit}
        className={`w-full mt-4 px-4 py-2 rounded text-white transition-colors duration-200 ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </Modal>
  );
}
