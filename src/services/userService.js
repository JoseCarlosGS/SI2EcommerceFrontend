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

// Actualizar un usuario existente
const updateUser = async (userId, userData) => {
  const response = await axios.put(`${API_URL}/${userId}`, userData);
  return response.data;
};

// Eliminar un usuario
const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`);
  return response.data;
};

export { getUsers, createUser, updateUser, deleteUser };
