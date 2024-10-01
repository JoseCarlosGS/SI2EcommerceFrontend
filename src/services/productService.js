import axios from 'axios';

const API_URL = 'http://localhost:8080/api/product';

const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

// Actualizar un usuario existente
const updateProduct = async (productId, productData) => {
  const response = await axios.put(`${API_URL}/${productId}`, productData);
  return response.data;
};

// Eliminar un usuario
const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_URL}/${productId}`);
  return response.data;
};

export { getProducts, createProduct, updateProduct, deleteProduct };