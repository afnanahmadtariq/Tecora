import React from "react";
import "./Question.css";
import htmlImg from "../../assets/html.jpeg";
import { FiExternalLink } from "react-icons/fi";

const Question = ({ post }) => {
  return (
    <div className="question-wrapper">
      <div className="user-info">
        <div className="img-sec">
          <img src={htmlImg} alt="" />
        </div>
        <div className="user-detail">
          <p>
            <span className="primary-text">{post.username}</span>
            <span className="date">{post.date}</span>
          </p>
          <p className="title">{post.title}</p>
        </div>
      </div>
      <h3>{post.questiontitle}</h3>
      <div className="question-tags">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="reply-view">
        <p>Replies: {post.replies.length}</p>
        <button className="open-project-btn">
          <span>Open</span>
          <FiExternalLink className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Question;
