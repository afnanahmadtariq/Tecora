import { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserDetails } from '../api/user';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("https://www.w3schools.com/w3images/avatar2.png");

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const getProfilePic = () => {
    return profilePic;
  }  

  // Function to check if the user is logged in
  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        const userDetails = await fetchUserDetails(token);
        if (userDetails) {
          setUser(userDetails[0]);
          if(userDetails[0]['profile pic']) {
            setProfilePic(userDetails[0]['profile pic']);
          }
          console.log("user details: ", userDetails[0]);
        } else {
          // If fetching fails, log out the user
          logout();
        }
      } else {
        // If no token, make sure user state is null
        setUser(null);
      } 
    };

    fetchUserData();
  }, [token]);  // This effect runs only when `token` changes

  return (
    <UserContext.Provider value={{ token, user, isLoggedIn, saveToken, logout, getProfilePic }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to access the UserContext
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
