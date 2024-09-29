// userService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user';

const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

export { getUsers, createUser };