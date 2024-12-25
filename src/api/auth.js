export const signUp = async (data) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send the data as a JSON string
    });

    return response;
  } catch (error) {
    console.error('Error:', error);
    // Optionally, return some error data or throw error
    return response;  // Or return an error message, depending on your use case
  }
};
