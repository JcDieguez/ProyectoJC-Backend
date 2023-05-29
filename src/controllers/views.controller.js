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
   let isAdmin = req.user.role.toString().toLowerCase() === "admin";
 
  res.render('home',{products,categorys,isAdmin:isAdmin,css:'home', paginationData});
};

const cart = async (req, res) => {
  const cart = await cartService.getCartById(req.user.cart._id,{populate:true});
  const name = req.user.name;
  const productos = cart.products?.map((product) => product._id);
  const isAdmin = req.user.role === 'ADMIN';
  const isUser = req.user.role === 'USER';
 
  res.render('cart', {
    productos,
    name,
    isAdmin,
    isUser
  });
};


const homeFiltrados = (req, res) => {
  let { products, categorys } = req.query;
   products = JSON.parse(products).map(item => item._doc);
   products = products.map(product =>{
    const exists = req.user.cart.products.some(v=>v._id.toString()===product._id.toString())
    return {...product,isValidToAdd:!exists}
})
  res.render('homeFiltrados', {
    products,
    categorys: JSON.parse(categorys)
  });
}


const logout = (req, res) => {
  res.clearCookie(process.env.JWT_COOKIE); // Eliminar la cookie de autenticación
  res.redirect('/login'); // Redirigir al usuario al inicio de sesión
};



export default {
  login,
  profile,
  register,
  cargaProductos,
  home,
  cart,
  homeFiltrados,
  logout
}
