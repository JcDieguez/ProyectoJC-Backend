import { Router } from "express";
import { usersService } from "../dao/index.js";
import { createHash, validatePassword } from "../utils.js";
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !email || !password) {
    return res.status(400).send({ status: "error", error: "Valores incompletos" });
  }
  const exists = await usersService.getBy({ email });
  if (exists) {
    return res.status(400).send({ status: "error", error: "El usuario ya existe" });
  }
  const hashedPassword = await createHash(password);
  const result = await usersService.save({
    first_name,
    last_name,
    email,
    password: hashedPassword
  });
  res.send({ status: "success", payload: result });
});

router.post('/login', passport.authenticate('local'), async (req, res) => {
  const user = req.user;
  req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  res.redirect('/welcome');
});

router.get('/loginFail', (req, res) => {
  console.log(req.session.messages);
  if (req.session.messages.length > 4) {
    return res.status(400).send({ message: "BLOQUEA LOS INTENTOS AHORA!!!!!" });
  }
  res.status(400).send({ status: "error", error: "Error de autenticación" });
});

router.get('/github', passport.authenticate('github'), (req, res) => { });

router.get('/githubcallback', passport.authenticate('github'), async (req, res) => {
  const user = req.user;
  req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  res.redirect('/welcome');
});

router.post('/logintoken', async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.getBy({ email });
  if (!user) {
    return res.status(400).send({ status: "error", error: "Credenciales inválidas" });
  }
  const isValidPassword = await validatePassword(password, user.password);
  if (!isValidPassword) {
    return res.status(400).send({ status: "error", error: "Contraseña incorrecta" });
  }
  const tokenizedUser = {
    name: `${user.first_name} ${user.last_name}`,
    role: user.role,
    id: user._id
  };
  const token = jwt.sign(tokenizedUser, "Unaclaves3CREtaQueNadieVea", { expiresIn: "1d" });
  res.send({ status: "success", token });
});

router.get('/current', async (req, res) => {
  const token = req.query.token;
  try {
    const user = jwt.verify(token, "Unaclaves3CREtaQueNadieVea");
    const result = await usersService.getBy({ _id: user.id });
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(400).send({ status: "error", error: "Token inválido" });
  }
});

router.get('/', (req, res) => {
  res.send('Sesiones API funcionando correctamente');
});

export default router;