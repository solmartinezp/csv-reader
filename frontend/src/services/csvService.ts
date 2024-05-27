const uploadCSV = (file: File): Promise<any[]> => {
    const formData = new FormData();
    formData.append("file", file);

    const apiUrl = process.env.REACT_APP_API_URL;

    if (!apiUrl) {
      throw new Error('REACT_APP_API_URL is not defined in environment variables');
    }
  
    return fetch(`${apiUrl}/api/files`, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  };
  
  export default uploadCSV;