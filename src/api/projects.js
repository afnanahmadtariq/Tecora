// Projects.js - Frontend service to handle API requests related to Projects

/**
 * Fetches the list of Projects from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of query objects.
 * @throws Will throw an error if the API request fails.
 */

// export const fetchProjects = async () => {
//     try {
//         console.log(import.meta.env.VITE_BACKEND_URL);
//       const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/projects'); // Replace with your actual API endpoint if different
//       if (!response.ok) {
//         throw new Error(`Failed to fetch projects: ${response.statusText}`);
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//       throw error;
//     }
//   };

// api/projects.js
export const fetchProjects = async () => {
  // Simulating an API call
  return [
    {
      id: 1,
      title: "Project 1",
      description:
        "This is an Html Project for learning basics of web Structure and Development",
      following: true,
      notfollowing: false,
      saved: false,
      tags: ["Html", "Web Development", "Basics"],
      upvote: "12k",
      downvote: "300",
    },
    {
      id: 2,
      title: "Project 1",
      description:
        "This is an Html Project for learning basics of web Structure and Development",
      following: true,
      notfollowing: false,
      saved: false,
      tags: ["Html", "figma", "tailwind", "Basics"],
      upvote: "12k",
      downvote: "300",
    },
    {
      id: 3,
      title: "Project 1",
      description:
        "This is an Html Project for learning basics of web Structure and Development",
      following: false,
      notfollowing: true,
      saved: false,
      tags: ["Html", "figma", "tailwind", "Basics"],
      upvote: "12k",
      downvote: "300",
    },
    {
      id: 4,
      title: "Project 1",
      description:
        "This is an Html Project for learning basics of web Structure and Development",
      following: true,
      notfollowing: false,
      saved: false,
      tags: ["Html", "figma", "tailwind", "Basics"],
      upvote: "12k",
      downvote: "300",
    },
    {
      id: 5,
      title: "Project 1",
      description:
        "This is an Html Project for learning basics of web Structure and Development",
      following: false,
      notfollowing: true,
      saved: false,
      tags: ["Html", "figma", "tailwind", "Basics"],
      upvote: "12k",
      downvote: "300",
    },
  ];
};

export const fetchProjectDetails = async (id) => {
  // Simulating fetching details for a project
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "Description for Project 1",
      progress: "In Progress",
      dateOfCreation: "2024-01-01",
      user: {
        username: "JohnDoe",
        email: "john@example.com",
        bio: "Developer",
      },
    },
    {
      id: 2,
      title: "Project 2",
      description: "Description for Project 2",
      progress: "Completed",
      dateOfCreation: "2023-10-10",
      user: { username: "JaneDoe", email: "jane@example.com", bio: "Designer" },
    },
  ];
  return projects.find((project) => project.id === parseInt(id));
};
