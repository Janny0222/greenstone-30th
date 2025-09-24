import axios from "axios";

const backendUrl = process.env.REACT_APP_API_URL || 'http://10.20.10.203:3001';

export const getGuestList = async () => {
  const response = await axios.get(`${backendUrl}/api/v1/guests`
  );
  return response.data;
}

export const addGuest = async (guestData) => {
  const response = await axios.post(`${backendUrl}/api/v1/guests`, guestData);
  return response.data;
}

export const getGuestByName = async (name) => {
  const response = await axios.get(`${backendUrl}/api/v1/guests/${name}`);
  return response.data;
}

export const getGuestByUserType = async (userType) => {
  const response = await axios.get(`${backendUrl}/api/v1/guests/type/${userType}`);
  return response.data;
}