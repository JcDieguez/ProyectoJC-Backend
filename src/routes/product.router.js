
import { Router } from "express";
import uploader from '../services/upload.js';
import productController from "../controllers/product.controller.js";



const router = Router();
router.post('/',uploader.single('image'),productController.cargaProductos)
router.get('/:category/:cartID', productController.productosFiltrados)

export default router;