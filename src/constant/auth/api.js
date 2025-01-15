import axios from 'axios';

const API_URL = 'http://localhost:3000/users'; 
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};


export const signInUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/sign-In`, credentials, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error signing in", error);
    throw error;
  }
};

