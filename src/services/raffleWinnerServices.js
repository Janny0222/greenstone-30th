import axios from "axios";

const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
export const getFirstRaffleWinners = async () => {
  const response = await axios.get(`${backendUrl}/api/v1/raffles/firstRaffle`);
  return response.data;
}

export const scanFirstRaffle = async (name) => {
  const response = await axios.get(`${backendUrl}/api/v1/raffles/firstRaffle/${name}`);
  return response.data;
}