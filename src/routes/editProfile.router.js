import express from 'express';
import multer from 'multer';
import path from 'path';
import { body, validationResult } from 'express-validator';
import Users from '../dao/Mongo/UsersContainer.js';
import { authMiddleware, ensureAuthenticated } from '../middlewares/auth.middleware.js';
import passport from 'passport';


const users = new Users();
const router = express.Router();
const __dirname = path.resolve();

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'avatars'));
  },
  filename: function (req, file, cb) {
    cb(null, req.user.username + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Vista para editar el perfil
router.get('/editProfile', passport.authenticate('jwt', { session: false }), ensureAuthenticated, async (req, res) => {
  const user = await users.getBy({ _id: req.user._id });
  res.render('editProfile', { user: user });
});

// Actualización de los datos del perfil
router.post(
  '/editProfile',
  passport.authenticate('jwt', { session: false }),
  ensureAuthenticated,
  upload.single('avatar'),
  body('name', 'El nombre debe tener entre 2 y 50 caracteres').isLength({
    min: 2,
    max: 50,
  }),
  body('email', 'El email no es válido').isEmail().normalizeEmail(),
  body('bio', 'La biografía debe tener entre 2 y 500 caracteres').isLength({
    min: 2,
    max: 500,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let avatarPath = null;
    if (req.file) {
      avatarPath = path.join('avatars', req.file.filename);
    }

    const user = await users.update(req.user._id, {
      name: req.body.name,
      email: req.body.email,
      bio: req.body.bio,
      avatar: avatarPath,
    });

    if (user.success) {
      res.redirect('/dashboard');
    } else {
      res.status(500).json({ error: user.error });
    }
  }
);

export default router;