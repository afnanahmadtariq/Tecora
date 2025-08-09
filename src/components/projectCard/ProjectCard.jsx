import htmlImg from "../../assets/html.jpeg";
import { FiExternalLink, FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div
      key={project.id}
      className="project-card"
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <div className="project-img-section">
        <img src={htmlImg} alt="" className="project-image" />
      </div>
      <div className="project-desc">
        <div className="title-bmark">
          <h3 className="project-title">{project.title}</h3>
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
            <span className="upvote vote">
              <FiThumbsUp size={16} style={{ marginRight: 4 }} />
              {project.upvote}
            </span>
            <span className="downvote vote">
              <FiThumbsDown size={16} style={{ marginRight: 4 }} />
              {project.downvote}
            </span>
          </div>
          <button
            className="open-project-btn"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/projects/${project.id}`);
            }}
          >
            Open <FiExternalLink style={{ marginLeft: 6 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
