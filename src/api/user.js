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
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
      const data = await response.json();
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
      body: JSON.stringify(data), 
    });
    return response;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}