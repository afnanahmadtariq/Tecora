import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import dummyimg from "../../assets/html2.jpeg";
import Question from "../../components/question/Question";
import htmlImg from "../../assets/html.jpeg";
// import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import "../../components/question/Question.css";

const Profile = () => {
  const location = useLocation();
  const { expert } = location.state || {};
  const handleCurrentTab = (tab) => {};
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "afnan",
      title: "Developer at Comsats Uni",
      questiontitle:
        "What tools can help streamline project management for a remote team?",
      date: "Apr 20, 2024",
      description:
        "Looking for recommendations on project management tools suitable for remote teams.",
      tags: ["Project Management", "Remote Work", "Collaboration"],
      upvotes: 15,
      downvotes: 2,
      replies: [
        {
          id: 1,
          text: "Some tool can be used",
          time: "12m",
          upvotes: 14,
          downvotes: 0,
          username: "user1",
        },
        {
          id: 2,
          text: "Figma? or something...",
          time: "12m",
          upvotes: 8,
          downvotes: 1,
          username: "user2",
        },
        {
          id: 3,
          text: "Use whatever you like",
          time: "12m",
          upvotes: 5,
          downvotes: 2,
          username: "user3",
        },
      ],
    },
    {
      id: 2,
      username: "afnan",
      title: "Developer at Comsats Uni",
      questiontitle:
        "What are the best strategies for staying productive while working remotely?",
      date: "Apr 22, 2024",
      description:
        "Looking for productivity strategies that work well for remote workers.",
      tags: ["Productivity", "Remote Work", "Work From Home"],
      upvotes: 22,
      downvotes: 3,
      replies: [
        {
          id: 1,
          text: "Stick to a structured routine",
          time: "10m",
          upvotes: 10,
          downvotes: 0,
          username: "user4",
        },
        {
          id: 2,
          text: "Designate a specific workspace",
          time: "8m",
          upvotes: 7,
          downvotes: 1,
          username: "user5",
        },
        {
          id: 3,
          text: "Take regular breaks to maintain focus",
          time: "5m",
          upvotes: 5,
          downvotes: 2,
          username: "user6",
        },
      ],
    },
    {
      id: 3,
      username: "aligee",
      title: "UI/UX Designer at Comsats Uni",
      questiontitle:
        "How do you ensure clear communication in a distributed team environment?",
      date: "Apr 25, 2024",
      description:
        "Looking for methods to improve communication in teams working remotely.",
      tags: ["Communication", "Distributed Teams", "Collaboration"],
      upvotes: 18,
      downvotes: 1,
      replies: [
        {
          id: 1,
          text: "Regular video meetings are crucial",
          time: "15m",
          upvotes: 11,
          downvotes: 0,
          username: "user7",
        },
        {
          id: 2,
          text: "Use communication tools like Slack or Microsoft Teams",
          time: "13m",
          upvotes: 6,
          downvotes: 1,
          username: "user8",
        },
        {
          id: 3,
          text: "Encourage transparent and frequent updates",
          time: "10m",
          upvotes: 4,
          downvotes: 0,
          username: "user9",
        },
      ],
    },
    {
      id: 4,
      username: "aligee",
      title: "UI/UX Designer at Comsats Uni",
      questiontitle:
        "Which tools are essential for effective time tracking for freelancers?",
      date: "Apr 28, 2024",
      description:
        "Seeking recommendations for time tracking tools that are effective for freelancers.",
      tags: ["Time Tracking", "Freelancing", "Productivity Tools"],
      upvotes: 25,
      downvotes: 2,
      replies: [
        {
          id: 1,
          text: "Toggl Track is a great option",
          time: "14m",
          upvotes: 13,
          downvotes: 0,
          username: "user10",
        },
        {
          id: 2,
          text: "Clockify works well and has free options",
          time: "12m",
          upvotes: 8,
          downvotes: 1,
          username: "user11",
        },
        {
          id: 3,
          text: "RescueTime can track time spent on apps and websites",
          time: "10m",
          upvotes: 6,
          downvotes: 0,
          username: "user12",
        },
      ],
    },
    {
      id: 5,
      username: "aligee",
      title: "UI/UX Designer at Comsats Uni",
      questiontitle:
        "What strategies do you use for team building in remote settings?",
      date: "Apr 30, 2024",
      description:
        "Looking for creative ideas to foster team building while working remotely.",
      tags: ["Team Building", "Remote Work", "Collaboration"],
      upvotes: 30,
      downvotes: 4,
      replies: [
        {
          id: 1,
          text: "Virtual team-building activities like online games",
          time: "15m",
          upvotes: 15,
          downvotes: 0,
          username: "user13",
        },
        {
          id: 2,
          text: "Organize regular virtual coffee breaks",
          time: "13m",
          upvotes: 9,
          downvotes: 1,
          username: "user14",
        },
        {
          id: 3,
          text: "Host workshops and skill-sharing sessions",
          time: "11m",
          upvotes: 6,
          downvotes: 3,
          username: "user15",
        },
      ],
    },
  ]);
  const handleReply = (postId, username = "") => {
    // setSelectedPost(posts.find((post) => post.id === postId));
    // const fetch = async () => {
    //   try {
    //     const replies = await fetchReply();
    //     setReplies(replies);
    //   } catch (err) {
    //     console.log("Failed to load replies. Please try again later.", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetch();
    // setReplyingTo(postId);
    // setReplyText(username ? `@${username} ` : "");
  };
  return (
    <div className="profile-container">
      <div className="personal-details py-3 pb-7 border-b-[1px] border-[var(--p-light)] flex justify-between px-12 items-center w-full">
        <div className="img-section w-[20%]">
          <img className="w-[80%] rounded-[50%]" src={dummyimg} alt="" />
        </div>
        <div className="details-section w-[80%]">
          <h3 className="text-[2rem] text-[var(--primary-color-light)] dark:text-[var(--primary-color-dark)] font-medium">
            {expert.name}
          </h3>
          <p className="text-[1rem] text-[var(--p-light)]">
            {expert.specialization}
          </p>

          <div className="aura-points text-md text-gray-500 flex space-x-4 mt-1">
            <span>⬆ {expert.followers}m</span>
            <span>🔥 {expert.recommendations}k</span>
          </div>
        </div>
      </div>
      <div className="work-details">
        <div className="work-buttons flex gap-5">
          <button
            onClick={() => handleCurrentTab("querry")}
            className=" hover:text-[#4296a9] font-bold border-b-[2px] border-[var(--primary-color-light)] dark:border-[var(--primary-color-dark)] text-[var(--primary-color-light)] dark:text-[var(--primary-color-dark)]"
          >
            Querries
          </button>
          <button
            onClick={() => handleCurrentTab("answer")}
            className="text-[var(--primary-color-light)] dark:text-[var(--primary-color-dark)] hover:text-[#4fb9d1]"
          >
            Answers
          </button>
          <button
            onClick={() => handleCurrentTab("projects")}
            className="text-[var(--primary-color-light)] dark:text-[var(--primary-color-dark)] hover:text-[#4fb9d1]"
          >
            Projects
          </button>
        </div>
        <div className="Querries-section w-[70%] my-5 mt-10 mx-auto flex flex-col gap-5">
          {posts.map((post, index) => (
            <div className="question-wrapper bg-[var(--accent-light)] dark:bg-[var(--accent-dark)] shadow-md rounded-md p-4">
              <h3 className="text-lg font-normal text-[var(--text-light)] dark:text-[var(--text-dark)] ">
                {post.questiontitle}
              </h3>
              <div className="question-tags">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag text-[var(--p-light)] dark:text-[var(--p-dark)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="reply-view">
                <p>Replies: {post.replies.length}</p>
                <button
                  onClick={() => {
                    handleReply(post.id, post.username);
                  }}
                  className="open-project-btn text-[var(--secondary-color-light)] dark:text-[var(--secondary-color-dark)]"
                >
                  <span>Open Replies</span>
                  <FiExternalLink className="ml-1" />
                </button>
              </div>
            </div>
          ))}
          {/* <Question */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
