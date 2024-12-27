// posts.js - Frontend service to handle API requests related to posts

/**
 * Fetches the list of posts from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of post objects.
 * @throws Will throw an error if the API request fails.
 */

export const fetchPosts = async () => {
  const token  = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authorization token found');
  }
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/feed/posts',{
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
    console.log("ye aya", data.feed);
    return await data.feed;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchReplies = async (id) => {
  const token  = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authorization token found');
  }
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/posts/getreplies',{
      method: 'GET', // Default method is 'GET', you can change it if needed
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'application/json',
        'id': `${id}`, 
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch replies: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("ye aya replies", data.replies);
    return await data.replies;
  } catch (error) {
    console.error('Error fetching replies:', error);
    throw error;
  }
};

export const sendReply = async (id, text) => {
  const token  = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authorization token found');
  }
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/posts/reply',{
      method: 'POST', // Default method is 'GET', you can change it if needed
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'id': `${id}`, 
        'text': `${text}`
      })
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch replies: ${response.statusText}`);
    }
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error('Error fetching replies:', error);
    throw error;
  }
};

export const fetchMyPosts = async () => {
  const token  = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authorization token found');
  }
  try {
    console.log(import.meta.env.VITE_BACKEND_URL);
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/posts/myposts',{
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
    console.log("", data.myposts);
    return data.myposts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchSavedPosts = async () => {
  try {
    console.log(import.meta.env.VITE_BACKEND_URL);
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/feed/posts'); // Replace with your actual API endpoint if different
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

export const fetchPostById = async (postId) => {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL+`/api/posts/getpost//1`);
  if (!response.ok) {
    throw new Error('Failed to fetch post details');
  }
  const data = await response.json();
  console.log("it is: ", data);
  return data;
};

export const createPost = async(data) => {
  const token  = localStorage.getItem('token');
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/posts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send the data as a JSON string
    });

    // If the response is not OK, throw an error
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    // Parse the JSON response and return it
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    // Optionally, return some error data or throw error
    return null;  // Or return an error message, depending on your use case
  }
}