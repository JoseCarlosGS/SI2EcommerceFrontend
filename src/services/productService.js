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

const assignCategoriesToProduct = async (productId, productData) => {
  const response = await axios.post(`${API_URL}/${productId}/categories`, productData)
  return response.data;
}

const getCategoriesToProduct = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}/categories`)
  return response.data;
}

const uploadProductImage = async (productId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.put(`${API_URL}/image/upload/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Retorna la URL de la imagen
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const getProductImages = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}/images`);
    return response.data; // Retorna la lista de URLs de imágenes
  } catch (error) {
    console.error('Error fetching product images:', error);
    throw error;
  }
};


export { getProducts, createProduct, updateProduct, deleteProduct, assignCategoriesToProduct, getCategoriesToProduct, uploadProductImage, getProductImages };