import productModel from '../../models/Product.js';


export default class ProductDAO {
   /* getVideogames = (params,page=1) =>{
        return videogamesModel.paginate(params,{page,limit:2,lean:true});
        // return videogamesModel.find(params).lean();
    }
*/
    cargaProductos = (product) =>{
        return productModel.create(product);
    }

    getProducts = (params,page) => {
        return productModel.paginate(params,{page,limit:4,lean:true});
    }

    getProductsAll = () => {
        return productModel.find({});

    }

    getProductById = (id) =>{
        return productModel.findById(id);
    }
    
     getProductsByCategoria = (category) => {
        return productModel.find({ category: category });
      };
      
}