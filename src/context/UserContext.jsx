import { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserDetails } from '../api/user';

// Create a context for user authentication and details
const UserContext = createContext();

export function UserProvider({ children }) {
  // Initialize state for JWT token and user details
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);  // User details will be fetched and stored here
  const [profilePic, setProfilePic] = useState("https://www.w3schools.com/w3images/avatar2.png");

  // Function to handle login (store token and user details)
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // Function to handle logout
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

  // Fetch user details when the token is present
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        // Make an API call to fetch user details
        const userDetails = await fetchUserDetails(token);
        if (userDetails) {
          setUser(userDetails[0]);
          if(userDetails[0]['profile pic']) {
            setProfilePic(userDetails[0]['profile pic']);
          }
          console.log("user details: ", userDetails[0]);
          // localStorage.setItem('user', JSON.stringify(userDetails));  // Optionally store user in localStorage
        } else {
          // If fetching fails, log out the user
          logout();
        }
      } else {
        // If no token, make sure user state is null
        setUser(null);
      }  // Set loading to false after fetching is complete
    };

    fetchUserData();
  }, [token]);  // This effect runs only when `token` changes

  return (
    <UserContext.Provider value={{ token, user, isLoggedIn, login, logout, getProfilePic }}>
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
