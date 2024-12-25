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