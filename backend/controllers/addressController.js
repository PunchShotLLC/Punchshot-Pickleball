// backend/controllers/addressController.js

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getAddressInfo = async (address) => {
  const apiKey = process.env.GEOAPIFY_API_KEY; // Use the environment variable
  const config = {
    method: 'get',
    url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(address)}&apiKey=${apiKey}`,
    headers: {}
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error fetching address information:', error);
    throw error;
  }
};