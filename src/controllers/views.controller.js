import ProductService from '../services/ProductService.js';
import CartService from '../services/CartService.js';
import HistoriesService from '../services/HistoriesService.js';

const productService = new ProductService();
const cartService = new CartService();
const historiesService = new HistoriesService();
const register = async (req, res) => {
  res.render('register');
};

const login = (req, res) => {
  res.render('login');
};

const profile = async(req,res)=>{
  const history = await historiesService.getHistoryBy({user:req.user.id});
  res.render('profile',{user:req.user,events:history?history.events:[]})
}

const cargaProductos = (req, res) => {
  res.render('cargaProductos')
}

const home = async (req, res) => {
  const categorys = [...new Set((await productService.getProductsAll()).map((product) => product.category))];
  let paginationData;
  let products;
  if(req.params.category){
    const category = req.params.category; 
    const cartID = req.params.cartID;
     products = await  productService.getProductsByCategoria(category);
    const cart = await cartService.getCartById(cartID);
    products = products.map(product =>{
        const exists = cart?.products.some(v=>v._id.toString()===product._id.toString())
        return {...product,isValidToAdd:!exists}
    })
   

  }else{

    const page = req.query.page||1;
    const cartId = req.user.cart;
    const pagination = await productService.getProducts({},page);
    products = pagination.docs;
    const cart = await cartService.getCartById(cartId);
    products = products.map(product =>{
        const exists = cart?.products.some(v=>v._id.toString()===product._id.toString())
        return {...product,isValidToAdd:!exists}
    })
    paginationData = {
       hasPrevPage:pagination.hasPrevPage,
       hasNextPage:pagination.hasNextPage,
       nextPage: pagination.nextPage,
       prevPage: pagination.prevPage,
       page: pagination.page
   }
  }
  res.render('home',{products,categorys,css:'home', paginationData});
};

const cart = async (req, res) => {
  const cart = await cartService.getCartById(req.user.cart._id,{populate:true});
  const name = req.user.name;
  const productos = cart.products?.map((product) => product._id);
 
  res.render('cart', {
    productos,
    name
  });
};


const homeFiltrados = (req, res) =>{
  console.log('hoooo')
  const {products, categorys} = req.body;
  console.log( req.body)
  res.render('homeFiltrados', {
   products: products, categorys :categorys
  });
}



/* router.post('/logout', (req, res) => {
   req.session.destroy(err => {
     if (err) {
       console.log(err);
       res.status(500).send('Error al cerrar sesión');
     } else {
       res.redirect('/login');
     }
   });
 }); 
 */





export default {
  login,
  profile,
  register,
  cargaProductos,
  home,
  cart,
  homeFiltrados
}