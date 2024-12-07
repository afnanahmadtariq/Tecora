// queries.js - Frontend service to handle API requests related to queries

/**
 * Fetches the list of queries from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of query objects.
 * @throws Will throw an error if the API request fails.
 */

export const fetchQueries = async () => {
    try {
        console.log(import.meta.env.VITE_BACKEND_URL);
      const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/queries'); // Replace with your actual API endpoint if different
      if (!response.ok) {
        throw new Error(`Failed to fetch queries: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching queries:', error);
      throw error;
    }
  };
  
  