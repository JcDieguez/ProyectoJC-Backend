import multer from "multer";
import path from "path";
import { Router } from "express";
import { userDAO } from "../dao/index.js";
import { createHash, validatePassword } from "../utils.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import UsersService  from "../services/UsersService.js";

const usersService= new UsersService();

const router = Router();

// configuración del middleware multer para manejar el archivo de imagen
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/avatars/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// ruta para subir la imagen de perfil
router.post(
  "/avatar",
  passport.authenticate("jwt", { session: false }), // middleware de autenticación
  upload.single("avatar"), // middleware de manejo de archivo de imagen
  async (req, res) => {
    try {
      const user = await usersService.getBy({ _id: req.user._id });
      if (!user) {
        return res.status(400).send({
          status: "error",
          error: "Usuario no encontrado",
        });
      }
      user.avatar = req.file.path;
      await user.save();
      res.send({ status: "success", payload: user });
    } catch (error) {
      res.status(500).send({ status: "error", error: error.message });
    }
  }
);

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

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.getByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
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
  console.log('/logintoken')
    const { email, password } = req.body;
    const user = await usersService.getUserByEmail(email);
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
  
    req.session.user = {
      id: user._id,
      email: user.email,
      name: user.first_name,
      lastName: user.last_name,
      role: user.role
    };
    
    const token = jwt.sign(tokenizedUser, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.send({ status: "success", token, user: user });
  });
  

router.get('/current', async (req, res) => {
  console.log('/current')

  const token = req.query.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
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