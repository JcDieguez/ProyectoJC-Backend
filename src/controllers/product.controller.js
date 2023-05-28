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
    const products = await  productService.getProductsByCategoria(category);
    const categorys = [...new Set((await productService.getProductsAll()).map((product) => product.category))];
    console.log(req.user);
    const cart = await cartService.getCartById(req.user.cart._id);
    products = products.map(product =>{
        const exists = cart?.products.some(v=>v._id.toString()===product._id.toString())
        return {...product,isValidToAdd:!exists}
    })
   
    res.render('home',{products,categorys,css:'home'});

}

export default {
    cargaProductos,
    productosFiltrados
}