export const fetchUserDetails = async (token) => {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/user', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        if (!response.ok) {
        throw new Error('Failed to fetch user details');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
};

export const fetchMyWorks = async () => {
    const token  = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authorization token found');
    }
    try {
      console.log(import.meta.env.VITE_BACKEND_URL);
      const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/user/myworks',{
        method: 'GET', // Default method is 'GET', you can change it if needed
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json', // Set content type (optional)
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("ye aya: ", data);
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

export const updateUserDetails = async (data) => {
  const token  = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authorization token found');
  }
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/update', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send the data as a JSON string
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    return null;  // Or return an error message, depending on your use case
  }
}