import ProductService from '../services/ProductService.js'
import CartService from '../services/CartService.js'

const productService = new ProductService();
const cartService = new CartService();

const cargaProductos = async(req,res)=>{
    const file = req.file;
    const  {title,description,code,price,category} = req.body;
    if(!title||!description||!code||!price) return res.status(400).send({status:"error",error:"Incomplete values"});
    const product = {
        title,
        description,
        code,
        price,
        category,
        image:`${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
    }
    const result = await productService.cargaProductos(product)
    res.send({status:"success",payload:result})
}


const productosFiltrados = async(req,res) =>{
    const category = req.params.category; 
    const paramsHeader = req.headers['parametros'];
    const cartID = JSON.parse(paramsHeader)
    var products = await  productService.getProductsByCategoria(category);
    const categorys = [...new Set((await productService.getProductsAll()).map((product) => product.category))];
    const cart = await cartService.getCartById(cartID);
    console.log(products)
    products = products.map(product =>{
        const exists = cart?.products.some(p=>p._id.toString()===product._id.toString())
        return {...product,isValidToAdd:!exists}
    })
   console.log(products)
    res.send({products:products,categorys:categorys});

}

const deleteProduct = async (req, res) => {
    const productId = req.params.productId;
  
    try {
      const result = await productService.eliminarProducto(productId);
      res.send({ status: "success", message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).send({ status: "error", error: "Failed to delete product" });
    }
  };
  
  export default {
    cargaProductos,
    productosFiltrados,
    deleteProduct // Agrega esta línea
  };
  