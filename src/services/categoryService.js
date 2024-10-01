import axios from "axios";
 const API_URL = 'http://localhost:8080/api/category'

const getCategories = async () => {
    const response = await axios.get(API_URL);
    return response.data;
 };

const createCategory = async (categoryData) => {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
 };

const updateCategory = async (categoryId, categoryData) => {
    const response = await axios.put(`${API_URL}/${categoryId}`, categoryData) ;
    return response.data;
};

const deleteCategory = async (categoryId) => {
    const response = await axios.delete(`${API_URL}/${categoryId}`);
    return response.data;
}

export { getCategories, createCategory, updateCategory, deleteCategory};