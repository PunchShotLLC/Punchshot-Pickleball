import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getAddressInfo = async (address) => {
  // Use the provided Geoapify API key directly in the code for demonstration purposes
  // In production, you should use an environment variable for the API key
  const apiKey = '14cea0e3ba0c4d108d7ac029bd20ab00';
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching address information:', error);
    throw error;
  }
};