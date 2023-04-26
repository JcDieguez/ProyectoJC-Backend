import axios from "axios";

// URL de la API REST de productos
const apiUrl = 'http://localhost:8080/products';

// Objeto de configuración de axios para que las respuestas incluyan el cuerpo de la respuesta en formato JSON
const axiosConfig = {
  responseType: 'json',
};

// Función que se encarga de imprimir un mensaje de éxito o error según si se ha completado correctamente la operación
function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log('Success: ', response.data);
  } else {
    console.error('Error: ', response.data);
  }
}

// Función que realiza una petición GET a la API REST de productos para obtener la lista de productos disponibles
async function testGetProducts() {
  try {
    const response = await axios.get(apiUrl, axiosConfig);
    handleResponse(response);
  } catch (error) {
    console.error('Error: ', error.response.data);
  }
}

// Función que realiza una petición POST a la API REST de productos para añadir un nuevo producto
async function testAddProduct(product) {
  try {
    const response = await axios.post(apiUrl, product, axiosConfig);
    handleResponse(response);
  } catch (error) {
    console.error('Error: ', error.response.data);
  }
}

// Función que realiza una petición PUT a la API REST de productos para modificar un producto existente
async function testUpdateProduct(productId, product) {
  try {
    const url = `${apiUrl}/${productId}`;
    const response = await axios.put(url, product, axiosConfig);
    handleResponse(response);
  } catch (error) {
    console.error('Error: ', error.response.data);
  }
}

// Función que realiza una petición DELETE a la API REST de productos para eliminar un producto existente
async function testDeleteProduct(productId) {
  try {
    const url = `${apiUrl}/${productId}`;
    const response = await axios.delete(url, axiosConfig);
    handleResponse(response);
  } catch (error) {
    console.error('Error: ', error.response.data);
  }
}

// Ejecutamos los tests
testGetProducts();
testAddProduct({ name: 'Nuevo producto', price: 10.99 });
testUpdateProduct(1, { name: 'Producto modificado', price: 5.99 });
testDeleteProduct(2);
