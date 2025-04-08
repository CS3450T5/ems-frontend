import axios from 'axios';

// Define the base URL for your backend API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/data';

// Create an axios instance with default configurations
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: Function to fetch data from an endpoint
export const fetchData = async (endpoint: string) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Example: Function to post data to an endpoint
export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export default apiClient;