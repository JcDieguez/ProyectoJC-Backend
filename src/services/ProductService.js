
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


    getProductById = (id) =>{
        return productDAO.getProductById(id);
    }
    

}