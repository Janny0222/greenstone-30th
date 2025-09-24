import axios from "axios";

const backendUrl = process.env.REACT_APP_API_URL || 'http://10.20.20.149:3001';

export const getAllAttendees = async () => {
  const response = await axios.get(`${backendUrl}/api/v1/attendees`);
  return response.data;
}

export const addAttendee = async (attendeeData) => {
  const response = await axios.post(`${backendUrl}/api/v1/attendees`, attendeeData);
  return response.data;
}