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
    
   
      eliminarProducto = (productId) => {
        return productModel.findByIdAndDelete(productId);
      };

      updateProduct = (product => {
        return productModel.findByIdAndUpdate(product.id, { $set: product });
      })
}