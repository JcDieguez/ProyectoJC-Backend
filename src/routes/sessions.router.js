import { Router } from "express";
import passport from "passport";
import sessionsController from "../controllers/sessions.controller.js";

const router = Router();

router.post('/register',sessionsController.register)
router.post('/login',sessionsController.login)
router.get('/loginFail',sessionsController.loginFail)
router.post('/logout', sessionsController.logout);
export default router;

