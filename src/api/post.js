export const sendDataToBackend = (data, path) => {
    fetch(import.meta.env.VITE_BACKEND_URL+'/api/'+path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send the data as a JSON string
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  


  