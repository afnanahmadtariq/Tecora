import React, { useState } from "react";
import { FiArrowLeft, FiPlus, FiExternalLink } from "react-icons/fi";

export default function ProjectPage() {
  // Sample data - in a real app this would come from props or state
  const project = {
    title: "Web Wonders",
    author: "Andrew Tate",
    progress: { current: 4, total: 7 },
    date: "Apr 20, 2024",
    tags: ["Management", "Software Project", "Software Company"],
    description:
      "In this project, I aim to master the process of building responsive websites that adapt seamlessly across devices, using modern frameworks like React and Tailwind CSS. I want to understand how to create layouts that look polished and professional on any screen size, from mobile phones to large desktops. This project will help me dive deeper into concepts like media posts, flexible grids, and component-based design, allowing me to develop web applications that provide a smooth user experience no matter the device. My goal is to build sites that are both functional and visually engaging using industry-leading tools.",
    questions: [
      {
        id: 1,
        title:
          "What tools can help streamline project management for a remote team?",
        replies: 10,
        author: {
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 2,
        title:
          "What tools can help streamline project management for a remote team?",
        replies: 10,
        author: {
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 3,
        title:
          "What tools can help streamline project management for a remote team?",
        replies: 10,
        author: {
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
    ],
  };

  const myProjects = [
    "Web Wonders",
    "AI Explorer",
    "Ecommerce Essentials",
    "Digital Marketing",
    "Creative Coding",
  ];

  const relatedProjects = [
    "UI/UX Journey",
    "Mobile Development",
    "Remote Work",
    "SEO Success Strategies",
  ];

  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <a
                  href="/projects"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiArrowLeft className="w-6 h-6" />
                </a>
                <h1 className="text-3xl font-bold text-white">
                  {project.title}
                </h1>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Author avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-gray-200">{project.author}</span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${
                          (project.progress.current / project.progress.total) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-200">{project.date}</span>
              </div>

              <div className="flex gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Questions */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Questions</h2>
                <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600">
                  <FiPlus className="w-4 h-4" />
                  Add Question
                </button>
              </div>

              <div className="flex gap-4 mb-6">
                {["All", "Active", "Solved"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-1 text-sm rounded-md ${
                      activeTab === tab
                        ? "bg-blue-500 text-white"
                        : "text-gray-400 bg-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {project.questions.map((question) => (
                  <div
                    key={question.id}
                    className="p-4 bg-transparent rounded-lg border border-gray-400 hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={question.author.avatar}
                        alt="Question author"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-300 mb-2">
                          {question.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            Replies: {question.replies}
                          </span>
                          <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                            View Answers
                            <FiExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-72">
            <div className="bg-transparent border p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-4">My Projects</h2>
              <ul className="space-y-3">
                {myProjects.map((project) => (
                  <li key={project}>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-gray-400 hover:text-blue-500"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full" />
                      {project}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-transparent border p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Related Projects</h2>
              <ul className="space-y-3">
                {relatedProjects.map((project) => (
                  <li key={project}>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-gray-400 hover:text-blue-500"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full" />
                      {project}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
