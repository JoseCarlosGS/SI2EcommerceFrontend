// authService.js
import axios from 'axios';

const login = async (credentials) => {
  const response = await axios.post('http://localhost:8080/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

export { login, logout };