import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const registerUser = async (registrationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, registrationData);
    
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // User already exists
      console.error('User already exists:', error.response.data.error);
      return { success: false, error: error.response.data.error };
    } else {
      // Other errors
      console.error('Error during user registration:', error);
      return { success: false, error: 'Registration failed' };
    }
  }
};

export const registerOwner = async (registrationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/registerOwner`, registrationData);
    
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // User already exists
      console.error('User already exists:', error.response.data.error);
      return { success: false, error: error.response.data.error };
    } else {
      // Other errors
      console.error('Error during user registration:', error);
      return { success: false, error: 'Registration failed' };
    }
  }
};
