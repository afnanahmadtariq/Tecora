// Projects.js - Frontend service to handle API requests related to Projects

/**
 * Fetches the list of Projects from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of post objects.
 * @throws Will throw an error if the API request fails.
 */

export const fetchProjects = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/projects',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
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

export const fetchProjectDetails = async (id) => {
  // Validate that id is a valid integer
  if (!Number.isInteger(Number(id))) {
    throw new Error("Invalid project ID");
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
};
