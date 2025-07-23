import dummyimg from "../assets/html2.jpeg";
const dummyExperts = [
  {
    name: "Elon Musk",
    specialization: "AI Technologies and Machine Learning",
    followers: 12,
    recommendations: 1.4,
    avatar: dummyimg, // Replace with actual image URL
    profileLink: "#",
  },
  {
    name: "Ali Jee",
    specialization: "AI Technologies and Machine Learning",
    followers: 12,
    recommendations: 1.4,
    avatar: dummyimg, // Replace with actual image URL
    profileLink: "#",
  },
  {
    name: "Genix",
    specialization: "AI Technologies and Machine Learning",
    followers: 12,
    recommendations: 1.4,
    avatar: dummyimg, // Replace with actual image URL
    profileLink: "#",
  },
  {
    name: "Sarah Connor",
    specialization: "Cybersecurity and Data Privacy",
    followers: 10,
    recommendations: 1.2,
    avatar: dummyimg, // Replace with actual image URL
    profileLink: "#",
  },
  {
    name: "John Doe",
    specialization: "Web Development and UI/UX",
    followers: 8,
    recommendations: 0.9,
    avatar: dummyimg, // Replace with actual image URL
    profileLink: "#",
  },
  {
    name: "Jane Smith",
    specialization: "Blockchain and Cryptocurrency",
    followers: 15,
    recommendations: 2.1,
    avatar: dummyimg, // Replace with actual image URL
    profileLink: "#",
  },
  {
    name: "Steve Jobs",
    specialization: "Product Innovation and Leadership",
    followers: 20,
    recommendations: 3.5,
    avatar: dummyimg, // Replace with actual image URL
    profileLink: "#",
  },
  {
    name: "Ada Lovelace",
    specialization: "Programming and Computer Science",
    followers: 18,
    recommendations: 2.8,
    avatar: dummyimg, // Replace with actual image URL
    profileLink: "#",
  },
  {
    name: "Mark Zuckerberg",
    specialization: "Social Media and Technology",
    followers: 13,
    recommendations: 1.6,
    avatar: dummyimg, // Replace with actual image URL
    profileLink: "#",
  },
];

export const fetchTopExperts = async () => {
  const token  = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authorization token found');
  }
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/experts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response;
  } catch (error) {
    console.error('Error:', error);
    return response; 
  }
}

