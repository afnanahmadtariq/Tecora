import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { isDark } = useTheme();
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("User123");
  const [email, setEmail] = useState("user@example.com");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [makeProfilePrivate, setMakeProfilePrivate] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const settingsData = {
      profileImage,
      username,
      email,
      emailNotifications,
      pushNotifications,
      makeProfilePrivate,
      showOnlineStatus,
    };
    console.log("Settings saved in JSON format:", settingsData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">Forum Settings</h1>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Image</h2>
          <div className="flex items-center">
            <label htmlFor="profile-image" className="cursor-pointer text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
              {profileImage ? (
                <img 
                  src={profileImage} 
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
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Username</span>
              <input 
                type="text" 
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Email</span>
              <input 
                type="email" 
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Change Password</span>
              <button className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">Reset</button>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
              <input 
                type="checkbox" 
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="toggle-switch h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-full relative"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Push Notifications</span>
              <input 
                type="checkbox" 
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
                className="toggle-switch h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-full relative"
              />
            </label>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Make Profile Private</span>
              <input 
                type="checkbox" 
                checked={makeProfilePrivate}
                onChange={() => setMakeProfilePrivate(!makeProfilePrivate)}
                className="toggle-switch h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-full relative"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Show Online Status</span>
              <input 
                type="checkbox" 
                checked={showOnlineStatus}
                onChange={() => setShowOnlineStatus(!showOnlineStatus)}
                className="toggle-switch h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-full relative"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>

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

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Stats</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center text-gray-600 dark:text-gray-300">
              <span>Total Posts</span>
              <span className="font-medium text-gray-900 dark:text-white">150</span>
            </li>
            <li className="flex justify-between items-center text-gray-600 dark:text-gray-300">
              <span>Upvotes Received</span>
              <span className="font-medium text-gray-900 dark:text-white">200</span>
            </li>
            <li className="flex justify-between items-center text-gray-600 dark:text-gray-300">
              <span>Followers</span>
              <span className="font-medium text-gray-900 dark:text-white">45</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}