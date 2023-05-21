import { Router } from 'express';
import viewsController from '../controllers/views.controller.js';
import { executePolicies } from "../middlewares/auth.middleware.js";


const router = Router();

//router.get('/profile', renderEditProfile);
router.get('/register',viewsController.register)
router.get('/login',viewsController.login)
router.post('/profile',viewsController.profile);
router.get('/home',viewsController.home);
router.get('/cargaProductos',viewsController.cargaProductos)
//router.get('/users/:id', getUserById);
//router.get('/login',viewsController.login)
//router.get('/profile',executePolicies(["AUTHENTICATED"]),viewsController.profile)


export default router;


