import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { updateUserDetails } from '../api/user';
import { Popup } from '../components/Popup';
import { FiCamera, FiSave } from 'react-icons/fi';

export default function Settings() {
  const { isDark } = useTheme();
  const { user, getProfilePic } = useUser();
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
  const [loading, setLoading] = useState(false);

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
  
  const handleSave = async () => {
    setLoading(true);
    try {
      const profileData = {
        username,
        email,
        bio,
        profile_pic: profilePic,
      };
      const res = await updateUserDetails(profileData);
      if (res.status == 201) {
        triggerPopup("Details updated successfully");
      }
    } catch (error) {
      console.error(error);
      triggerPopup("Failed to update details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Popup message={popupMessage} showPopup={showPopup} isWarning={isWarning}/>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Settings Section */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Profile Section */}
            <section className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>

              <div className="flex items-center gap-6 mb-8">
                <div className="relative group">
                  <img
                    src={profilePic || "https://www.w3schools.com/w3images/avatar2.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <label htmlFor="profile-image" className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity duration-200">
                    <FiCamera className="w-6 h-6" />
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div>
                   <h3 className="font-medium text-lg">{user?.username || 'User'}</h3>
                   <p className="text-muted-foreground text-sm">Update your photo and personal details.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Username</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={user?.username || 'Set username'}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={user?.email || 'Set email'}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Bio</label>
                  <textarea
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[100px]"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={user?.bio || 'Tell us about yourself'}
                  />
                </div>
              </div>
            </section>

            {/* Expertise Section */}
            <section className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Expertise & Socials</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Expertise</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-sm font-medium text-foreground">LinkedIn</label>
                     <input
                       type="url"
                       className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                       value={socialLinks.linkedin}
                       onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-medium text-foreground">GitHub</label>
                     <input
                       type="url"
                       className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                       value={socialLinks.github}
                       onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                     />
                   </div>
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-all font-medium disabled:opacity-50"
              >
                <FiSave className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
               <h3 className="font-semibold mb-4 text-foreground">Quick Tips</h3>
               <ul className="space-y-3 text-sm text-muted-foreground">
                 <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    Updates may take a few moments to reflect across the platform.
                 </li>
                 <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    Using a clear profile picture increases trust.
                 </li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
