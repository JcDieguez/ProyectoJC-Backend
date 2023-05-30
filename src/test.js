import axios from "axios";

const apiUrl = 'http://localhost:8080/products';

const axiosConfig = {
  responseType: 'json',
};

function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log('Success: ', response.data);
  } else {
    console.error('Error: ', response.data);
  }
}

async function testGetProducts() {
  try {
    const response = await axios.get(apiUrl, axiosConfig);
    handleResponse(response);
  } catch (error) {
    console.error('Error: ', error.response.data);
  }
}

async function testAddProduct(product) {
  try {
    const response = await axios.post(apiUrl, product, axiosConfig);
    handleResponse(response);
  } catch (error) {
    console.error('Error: ', error.response.data);
  }
}

async function testUpdateProduct(productId, product) {
  try {
    const url = `${apiUrl}/${productId}`;
    const response = await axios.put(url, product, axiosConfig);
    handleResponse(response);
  } catch (error) {
    console.error('Error: ', error.response.data);
  }
}

async function testDeleteProduct(productId) {
  try {
    const url = `${apiUrl}/${productId}`;
    const response = await axios.delete(url, axiosConfig);
    handleResponse(response);
  } catch (error) {
    console.error('Error: ', error.response.data);
  }
}

testGetProducts();
testAddProduct({ name: 'Nuevo producto', price: 10.99 });
testUpdateProduct(1, { name: 'Producto modificado', price: 5.99 });
testDeleteProduct(2);
