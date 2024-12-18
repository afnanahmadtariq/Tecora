import React, { useState } from 'react';
import { Modal } from './Modal';

export function PostModal({ isOpen, onClose, onSubmit }) {
  const [activeTab, setActiveTab] = useState("post");
  const [postContent, setPostContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState(""); // This will store the file or URL
  const [question, setQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [title, setTitle] = useState(""); // Title field

  const handleSubmit = () => {
    let postData;
    switch (activeTab) {
      case "post":
        postData = { type: "post", title, content: postContent, media: mediaUrl };
        break;
      case "question":
        postData = { type: "question", title, content: question };
        break;
      case "poll":
        postData = { type: "poll", title, options: pollOptions.filter(option => option.trim() !== "") };
        break;
      default:
        return;
    }
    onSubmit(postData);
    onClose();
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
      <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
      <div className="mb-4">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${activeTab === "post" ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setActiveTab("post")}
          >
            Post
          </button>
          <button
            className={`py-2 px-4 ${activeTab === "question" ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setActiveTab("question")}
          >
            Question
          </button>
          <button
            className={`py-2 px-4 ${activeTab === "poll" ? "border-b-2 border-blue-500" : ""}`}
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
          className="w-full p-2 border rounded"
        />
      </div>
      {activeTab === "post" && (
        <div className="space-y-4">
          <textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full p-2 border rounded min-h-[100px]"
          />
          <div
            className="w-full p-4 border rounded border-dashed"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-center text-gray-600">Drag & drop an image/video or click to select</p>
            <input
              type="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer w-full text-center">
              <span role="img" aria-label="camera" className="block text-3xl text-gray-500">
                📸
              </span>
              <p className="text-center text-gray-600">Add Image/Video</p>
            </label>
            {mediaUrl && (
              <div className="mt-4">
                <p>Media Preview:</p>
                {mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.mov') ? (
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
            />
          ))}
          <button
            onClick={addPollOption}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Add Option
          </button>
        </div>
      )}
      <button
        onClick={handleSubmit}
        className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Post
      </button>
    </Modal>
  );
}
