import { Router } from 'express';
import viewsController from '../controllers/views.controller.js';
import { executePolicies } from "../middlewares/auth.middleware.js";


const router = Router();

router.get('/register',viewsController.register)
router.get('/login',viewsController.login)
router.post('/profile',executePolicies(["AUTHENTICATED"]), viewsController.profile);
router.get('/',executePolicies(["AUTHENTICATED"]),viewsController.home);
router.get('/cargaProductos',executePolicies(["ADMIN"]) , viewsController.cargaProductos)
//router.get('/users/:id', getUserById);



export default router;


