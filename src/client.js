import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/products';

async function getAllProducts() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

async function getProductById(id) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}

async function addProduct(product) {
  const response = await axios.post(BASE_URL, product);
  return response.data;
}

async function updateProduct(id, product) {
  const response = await axios.put(`${BASE_URL}/${id}`, product);
  return response.data;
}

async function deleteProduct(id) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
