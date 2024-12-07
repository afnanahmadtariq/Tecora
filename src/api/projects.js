// Projects.js - Frontend service to handle API requests related to Projects

/**
 * Fetches the list of Projects from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of query objects.
 * @throws Will throw an error if the API request fails.
 */

export const fetchProjects = async () => {
    try {
        console.log(import.meta.env.VITE_BACKEND_URL);
      const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/projects'); // Replace with your actual API endpoint if different
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  };
  
  