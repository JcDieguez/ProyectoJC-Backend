import { Router } from "express";
import uploader from '../services/upload.js';
import productController from "../controllers/product.controller.js";
import { executePolicies } from "../middlewares/auth.middleware.js";


const router = Router();
router.post('/',uploader.single('image'),productController.cargaProductos)
router.delete('/cart/:productId', executePolicies(["USER"]), productController.deleteProduct);


export default router;
