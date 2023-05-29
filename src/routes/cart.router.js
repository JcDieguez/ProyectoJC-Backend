import cartController from "../controllers/cart.controller.js";
import { Router } from 'express';
import { executePolicies } from "../middlewares/auth.middleware.js";


const router = Router();

router.get('/product/:productId', executePolicies(["USER"]), cartController.insertProductToCart);

router.post('/purchase',executePolicies(['USER']),cartController.purchase)


export default router;