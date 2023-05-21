import { Router } from "express";
import passport from "passport";
import sessionsController from "../controllers/sessions.controller.js";

const router = Router();

//router.post('/register',uploader.single('avatar'),sessionsController.register)
router.post('/register',sessionsController.register)
router.post('/login',sessionsController.login)
router.get('/loginFail',sessionsController.loginFail)
export default router;

