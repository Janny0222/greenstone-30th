import axios from "axios";

export const getGuestList = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/guests`
  );
  return response.data;
}

export const addGuest = async (guestData) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/guests`, guestData);
  return response.data;
}

export const getGuestByName = async (name) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/guests/${name}`);
  return response.data;
}