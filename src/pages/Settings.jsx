import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { sendDataToBackend } from '../api/post';

export default function Settings() {
  const { isDark, toggleTheme } = useTheme(); 
  
  // General settings state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [privacyFeed, setPrivacyFeed] = useState('public');
  const [messagePrivacy, setMessagePrivacy] = useState('followers');
  const [dataPrivacy, setDataPrivacy] = useState(true);
  const [language, setLanguage] = useState('en');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  
  // Community settings state
  const [defaultCommunities, setDefaultCommunities] = useState([]);
  const [communityNotifications, setCommunityNotifications] = useState(true);
  const [emailDigestFrequency, setEmailDigestFrequency] = useState('weekly');
  const [feedSort, setFeedSort] = useState('newest');
  const [feedFilter, setFeedFilter] = useState([]);
  const [contentPreferences, setContentPreferences] = useState({
    polls: true,
    images: true,
    videos: true
  });

  const handleSave = async () => {
    const settingsData = {
      username,
      email,
      password, 
      email_notifications: emailNotifications,
      push_notifications: pushNotifications,
      privacy_feed: privacyFeed,
      message_privacy: messagePrivacy,
      data_privacy: dataPrivacy,
      language,
      theme: isDark ? 'dark' : 'light',
      two_factor_auth: is2FAEnabled,
      default_communities: defaultCommunities,
      community_notifications: communityNotifications,
      email_digest_frequency: emailDigestFrequency,
      feed_sort: feedSort,
      feed_filter: feedFilter,
      content_preferences: contentPreferences
    };
    sendDataToBackend(settingsData, 'update-settings');
    console.log("Settings data to be sent to backend:", settingsData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Settings Section */}
      <div className="lg:col-span-3">
        {/* General Settings */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">General</h2>
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h2>

          {/* Account Information */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Username</span>
              <input
                type="text"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Change username"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Email</span>
              <input
                type="email"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Change email"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Password</span>
              <input
                type="password"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Change password"
              />
            </div>
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

          {/* Notifications */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
              <input
                type="checkbox"
                className="toggle-switch"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Push Notifications</span>
              <input
                type="checkbox"
                className="toggle-switch"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
              />
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy Settings</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Who can see your activity feed?</span>
              <select
                value={privacyFeed}
                onChange={(e) => setPrivacyFeed(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="public">Public</option>
                <option value="followers">Followers</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Who can message you?</span>
              <select
                value={messagePrivacy}
                onChange={(e) => setMessagePrivacy(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="followers">Followers Only</option>
                <option value="anyone">Anyone</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Data Privacy</span>
              <input
                type="checkbox"
                className="toggle-switch"
                checked={dataPrivacy}
                onChange={(e) => setDataPrivacy(e.target.checked)}
              />
            </div>
          </div>

          {/* Language and Theme */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Language & Theme</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Preferred Language</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                {/* Add more languages as needed */}
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Theme</span>
              <button
                onClick={toggleTheme}
                className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Enable 2FA</span>
              <input
                type="checkbox"
                className="toggle-switch"
                checked={is2FAEnabled}
                onChange={(e) => setIs2FAEnabled(e.target.checked)}
              />
            </div>
          </div>
        </section>

        {/* Community Settings */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Community Settings</h2>
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 transition-colors duration-200">

          {/* Community Preferences */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Community Preferences</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Default Communities</span>
              <input
                type="text"
                value={defaultCommunities.join(', ')}
                onChange={(e) => setDefaultCommunities(e.target.value.split(',').map(item => item.trim()))}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter default communities"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Community Notifications</span>
              <input
                type="checkbox"
                className="toggle-switch"
                checked={communityNotifications}
                onChange={(e) => setCommunityNotifications(e.target.checked)}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Email Digest Frequency</span>
              <select
                value={emailDigestFrequency}
                onChange={(e) => setEmailDigestFrequency(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          {/* Feed Settings */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Feed Settings</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Sort Feed by</span>
              <select
                value={feedSort}
                onChange={(e) => setFeedSort(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Popular</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Filter Feed by</span>
              <input
                type="text"
                value={feedFilter.join(', ')}
                onChange={(e) => setFeedFilter(e.target.value.split(',').map(item => item.trim()))}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm w-2/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter tags or communities"
              />
            </div>
          </div>

          {/* Content Preferences */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Content Preferences</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Show Polls</span>
              <input
                type="checkbox"
                className="toggle-switch"
                checked={contentPreferences.polls}
                onChange={(e) => setContentPreferences({ ...contentPreferences, polls: e.target.checked })}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Show Images</span>
              <input
                type="checkbox"
                className="toggle-switch"
                checked={contentPreferences.images}
                onChange={(e) => setContentPreferences({ ...contentPreferences, images: e.target.checked })}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Show Videos</span>
              <input
                type="checkbox"
                className="toggle-switch"
                checked={contentPreferences.videos}
                onChange={(e) => setContentPreferences({ ...contentPreferences, videos: e.target.checked })}
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
