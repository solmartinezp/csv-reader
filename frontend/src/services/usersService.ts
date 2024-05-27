// services/userService.ts

export const searchUsers = async (searchTerm: string) => {

    const apiUrl = process.env.REACT_APP_API_URL;

    if (!apiUrl) {
      throw new Error('REACT_APP_API_URL is not defined in environment variables');
    }

    const response = await fetch(`${apiUrl}/api/users?q=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};