import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getAddressInfo = async (address) => {
  const apiKey = process.env.ADDRESS_API_KEY;
  const url = `https://api.addressservice.com/lookup?api_key=${apiKey}&address=${address}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching address information:', error);
    throw error;
  }
};