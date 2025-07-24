import React from "react";
import htmlImg from "../../assets/html.jpeg";
import { FiExternalLink } from "react-icons/fi";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  return (
    <div
      key={project.id}
      className="project-card"
      onClick={() => navigate(`/projects/${project.id}`)} // Use navigate to route to the project details page
    >
      <div className="project-img-section">
        <img src={htmlImg} alt="" className="project-image" />
      </div>
      <div className="project-desc">
        <div className="title-bmark">
          <h3 className="project-title">{project.title}</h3>
          <span>
            <svg
              height={20}
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />
              <g data-name="1" id="_1">
                <path d="M393,450a14.92,14.92,0,0,1-7.46-2L257,374.29,128.46,448A15,15,0,0,1,106,435V63a15,15,0,0,1,15-15H393a15,15,0,0,1,15,15V435a15,15,0,0,1-15,15ZM257,342a14.92,14.92,0,0,1,7.46,2L378,409.1V78H136V409.1L249.54,344A14.92,14.92,0,0,1,257,342Z" />
              </g>
            </svg>
          </span>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="card-tags">
          {(project.tags || []).map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="aura-open">
          <div className="aura">
            <p className="upvote">
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
              </svg>
              {project.upvote}
            </p>
            <p className="downvote">
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z" />
              </svg>
              {project.downvote}
            </p>
          </div>
          <button className="open-project-btn">
            Open
            <FiExternalLink className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
