export const fetchPosts = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authorization token found');
  }
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/feed/posts', {
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
    return await data.feed;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchReplies = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authorization token found');
  }
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/posts/getreplies', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'id': `${id}`,
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch replies: ${response.statusText}`);
    }
    const data = await response.json();
    return await data.replies;
  } catch (error) {
    console.error('Error fetching replies:', error);
    throw error;
  }
};

export const sendReply = async (id, text) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authorization token found');
  }
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/posts/reply', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
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
    return response;
  } catch (error) {
    console.error('Error fetching replies:', error);
    throw error;
  }
};

export const fetchMyPosts = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authorization token found');
  }
  try {
    console.log(import.meta.env.VITE_BACKEND_URL);
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/posts/myposts', {
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
    return data.myposts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchSavedPosts = async () => {
  try {
    console.log(import.meta.env.VITE_BACKEND_URL);
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/feed/posts');
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
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authorization token found');
  }

  // Assuming the backend accepts ID in the headers like fetchReplies (based on consistency)
  // OR it might be a path parameter which `.../getpost//1` tried to emulate.
  // I will try sending it as a header first to match `fetchReplies` style if that's the established pattern, 
  // BUT `//1` strongly suggests path. 
  // Let's support both or try path first.

  // Correction: "getpost//1" looks like "getpost/" + "/1".

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/getpost`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'id': postId // Sending in header to match fetchReplies pattern which is unusual but existing
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch post details');
  }
  const data = await response.json();
  return data.post; // Assuming response structure { post: ... }
};

export const createPost = async (data) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/posts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}