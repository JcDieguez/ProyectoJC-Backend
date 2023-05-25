import CartService from "../services/CartService.js";
import ProductService from "../services/ProductService.js";

const cartService = new CartService();
const productService = new ProductService();

const insertProductToCart = async (req, res) => {
  console.log(req.user)
  const user = req.user;
  const productId = req.params.productId;
 // const cartId = user.cart._id;
  const cart = user.cart;
  
  // Corroboro si el producto ya existe en el carrito
  const exists = cart.products?.some((product) => product._id.toString() === productId);
  if (exists) {
    return res.status(400).send({ status: "error", error: "Product already exists" });
  }

  const product = await productService.getProductById(productId);

  if (!product) {
    return res.status(404).send({ status: "error", error: "Product not found" });
  }

  cart.products.push(product);
  await cartService.updateCart(user.cart._id, { products: cart.products });
  res.redirect('/cart');
};

export default {
  insertProductToCart
};

