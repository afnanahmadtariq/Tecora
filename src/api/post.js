export const sendDataToBackend = async (data, path) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/' + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send the data as a JSON string
    });

    // If the response is not OK, throw an error
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    // Parse the JSON response and return it
    return response;
  } catch (error) {
    console.error('Error:', error);
    // Optionally, return some error data or throw error
    return null;  // Or return an error message, depending on your use case
  }
};
