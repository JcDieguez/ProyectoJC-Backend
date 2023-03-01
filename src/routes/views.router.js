import { Router } from "express";
import os from 'os';
import path from 'path';
const __dirname = path.resolve();
const router = Router();

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/welcome', (req, res) => {
  const userEmail = req.session.user && req.session.user.email;
  const message = `¡Bienvenido, ${userEmail}!`;

  res.render('welcome', { message, email: userEmail });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al cerrar sesión');
    } else {
      res.redirect('/login');
    }
  });
});

router.get('/info', (req, res) => {
  const platform = os.platform();
  const nodeVersion = process.version;
  const memory = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
  const path = process.cwd();
  const pid = process.pid;
  const projectPath = __dirname;

  res.render('info', {
    platform,
    nodeVersion,
    memory,
    path,
    pid,
    projectPath,
    args: process.argv
  });
});

export default router;