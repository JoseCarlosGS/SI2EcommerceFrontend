import axios from 'axios';

const API_URL = 'http://localhost:8080/api/role';

const getRoles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createRole = async (roleData) => {
  const response = await axios.post(API_URL, roleData);
  return response.data;
};

export { getRoles, createRole };