import { Router } from 'express';
import { executePolicies } from "../middlewares/auth.middleware.js";
import cartController from "../controllers/cart.controller.js";
const router = Router();

router.get('/product/:productId', executePolicies(["USER"]), cartController.insertProductToCart);
router.post('/purchase',executePolicies(['USER']),cartController.purchase)
router.delete('/cart/:productId', executePolicies(["USER"]), cartController.deleteProductFromCart);




export default router;