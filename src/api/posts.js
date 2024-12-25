// posts.js - Frontend service to handle API requests related to posts

/**
 * Fetches the list of posts from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of post objects.
 * @throws Will throw an error if the API request fails.
 */

export const fetchPosts = async () => {
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
  const response = await fetch(import.meta.env.VITE_BACKEND_URL+`/api/posts/1`);
  if (!response.ok) {
    throw new Error('Failed to fetch post details');
  }
  const data = await response.json();
  console.log("it is: ", data);
  return data;
};
