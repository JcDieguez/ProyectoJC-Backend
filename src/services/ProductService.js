
import ProductDAO from '../dao/Mongo/ProductDAO.js'
const productDAO = new ProductDAO();
export default class ProductService {
    constructor() {
    }

    cargaProductos = (params) =>{
        return productDAO.cargaProductos(params);
    }

    getProducts = (params,page) =>{
        return productDAO.getProducts(params,page);
    }

    getProductsAll = () =>{
        return productDAO.getProductsAll();
    }

    getProductById = (id) =>{
        return productDAO.getProductById(id);
    }

     getProductsByCategoria = async (category) => {
        return await productDAO.getProductsByCategoria(category);
    }
    
    eliminarProducto = async (productId) => {
      try {
        const result = await productDAO.eliminarProducto(productId);
        return result;
      } catch (error) {
        throw error;
      }
    };
  }