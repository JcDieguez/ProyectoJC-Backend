import ProductService from '../services/ProductService.js';
import CartService from '../services/CartService.js';

const productService = new ProductService();
const cartService = new CartService();

const register = async (req, res) => {
  res.render('register');
};

const login = (req, res) => {
  res.render('login');
};

const profile = (req, res) => {
  res.render('profile', { user: req.user })
}

const cargaProductos = (req, res) => {
  res.render('cargaProductos')
}

const home = async (req, res) => {
  const page = req.query.page||1;
  const cartId = req.user.cart;
  const pagination = await productService.getProducts({},page);
  let products = pagination.docs;
  const cart = await cartService.getCartById(cartId);
  products = products.map(product =>{
      const exists = cart?.products.some(v=>v._id.toString()===product._id.toString())
      return {...product,isValidToAdd:!exists}
  })
  const paginationData = {
      hasPrevPage:pagination.hasPrevPage,
      hasNextPage:pagination.hasNextPage,
      nextPage: pagination.nextPage,
      prevPage: pagination.prevPage,
      page: pagination.page
  }
  res.render('home',{products,css:'home', paginationData});
};

const cart = async (req, res) => {
  const cart = req.user.cart;
  const name = req.user.name;
  const productos = cart.products?.map((product) => product._id);
  res.render('cart', {
    productos,
    name
  });
};



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
  cart
}