import React from "react";
import { useLocation } from "react-router-dom";
import dummyimg from "../../assets/html2.jpeg";

const Profile = () => {
  const location = useLocation();
  const { expert } = location.state || {};
  const handleCurrentTab = (tab) => {};
  return (
    <div className="profile-container">
      <div className="personal-details py-3 pb-7 border-b-[1px] border-[var(--p-light)] flex justify-between px-12 items-center w-full">
        <div className="img-section w-[20%]">
          <img className="w-[80%] rounded-[50%]" src={dummyimg} alt="" />
        </div>
        <div className="details-section w-[80%]">
          <h3 className="text-[2rem] text-[var(--primary-color-light)] font-medium">
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
            className=" hover:text-[#4fb9d1]"
          >
            Querries
          </button>
          <button
            onClick={() => handleCurrentTab("answer")}
            className=" hover:text-[#4fb9d1]"
          >
            Answers
          </button>
          <button
            onClick={() => handleCurrentTab("projects")}
            className=" hover:text-[#4fb9d1]"
          >
            Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
