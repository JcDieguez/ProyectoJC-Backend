import CartService from "../services/CartService.js";
import ProductService from "../services/ProductService.js";

const cartService = new CartService();
const productService = new ProductService();

const insertProductToCart = async (req, res) => {
  const user = req.user;
  const productId = req.params.productId;
  const cart = await cartService.getCartById(user.cart._id,{populate:true});
  
  const exists = cart.products?.some((product) => product._id.toString() === productId);
  if (exists) {
    return res.status(400).send({ status: "error", error: "Product already exists" });
  }
  
  const product = await productService.getProductById(productId);
  
  if (!product) {
    return res.status(404).send({ status: "error", error: "Product not found" });
  }
  cart.products.push({_id:product._id});
  await cartService.updateCart(user.cart._id, { products: cart.products });
  res.redirect('/cart');
};

export default {
  insertProductToCart
};

