import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { updateUserDetails } from '../api/user';
import { Popup } from '../components/Popup';

export default function Settings() {
  const { isDark } = useTheme();
  const { user, getProfilePic } = useUser();
  
  // Profile state variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(getProfilePic());
  const [expertise, setExpertise] = useState("Web Development");
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "https://linkedin.com/in/user",
    github: "https://github.com/user"
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isWarning, setIsWarning] = useState(false);

  // Handle profile image change
  const handleImageChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 4000); 
  };
  
  // Handle save functionality
  const handleSave = async () => {
    const profileData = {
      username,
      email,
      // password, 
      bio,
      profile_pic: profilePic ,
      // expertise,
      // social_links: socialLinks
    };
    console.log("Profile data to be sent to backend:", profileData);
    const res = await updateUserDetails(profileData);
    if (res.status == 201) {
      triggerPopup("Details updated");
    }
  };


  return (
    <>
      <Popup message={popupMessage} showPopup={showPopup} isWarning={isWarning}/>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Settings Section */}
        <div className="lg:col-span-3">
          {/* Profile and Account Settings */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 transition-colors duration-200">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Settings</h2>

            {/* Profile Image */}
            <div className="flex items-center mb-4">
              <label htmlFor="profile-image" className="cursor-pointer text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    No Image
                  </div>
                )}
              </label>
              <input
                type="file"
                id="profile-image"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <span className="ml-4 text-gray-700 dark:text-gray-300">Upload a new image</span>
            </div>

            {/* Username, Email, and Bio */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Username</span>
                <input
                  type="text"
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={user? user.username : 'Set New username'}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Email</span>
                <input
                  type="email"
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={user? user.email : 'Set New Email'}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Password</span>
                <input
                  type="password"
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password (if changing)"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Bio</span>
                <textarea
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={user? user.bio? user.bio : 'No Bio Set' : "Add New Bio"}
                />
              </div>
            </div>
          </section>

          {/* Expertise and Social Links */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 transition-colors duration-200">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expertise and Social Links</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Expertise</span>
                <input
                  type="text"
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">LinkedIn</span>
                <input
                  type="url"
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={socialLinks.linkedin}
                  onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">GitHub</span>
                <input
                  type="url"
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={socialLinks.github}
                  onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Sidebar (Optional) */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 transition-colors duration-200">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Categories</h2>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Programming
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Web Development
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                AI and Machine Learning
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Cybersecurity
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
