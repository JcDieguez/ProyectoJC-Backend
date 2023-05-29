import UserDAO from '../dao/Mongo/UserDAO.js';
import CartService from '../services/CartService.js';
import UserService from '../services/UserService.js';

import { validatePassword,createHash } from '../utils.js';
import jwt from 'jsonwebtoken';
import Cart from '../models/Cart.js'
import config from '../config/config.js';


   const cartService = new CartService()
   const userService = new UserService();
   const userDAO = new UserDAO();
   const register =  async (req, res) => {
     const { first_name, last_name, email, password } = req.body;
     if (!first_name || !email || !password) {
       return res.status(400).send({ status: "error", error: "Valores incompletos" });
      }
      const exists = await userDAO.getBy({ email });
      if (exists) {
        return res.status(400).send({ status: "error", error: "El usuario ya existe" });
      }
      const hashedPassword = await createHash(password);
      const result = await userService.save({
        first_name,
        last_name,
        email,
        password: hashedPassword
      });
      res.send({ status: "success", payload: result });
    };

    const login = async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await userDAO.getBy({ email });
        if (!user) {
          return res.status(400).send({ status: "error", error: "Credenciales inválidas" });
        }
        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword) {
          return res.status(400).send({ status: "error", error: "Contraseña incorrecta" });
        }
        user.cart = new Cart();
        user.cart.products = user.cart.products || [];
        cartService.createCart(user.cart);
        const userToken = {
            cart: user.cart,
            name:`${user.first_name} ${user.last_name}`,
            role:user.role,
            id:user._id,
            avatar:user.avatar || 'url genérica'
        };
        const token = await jwt.sign(userToken,process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie(process.env.JWT_COOKIE,token).send({userToken: userToken, token:token, status:"success",message:"logged in"})
      } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
      }
    };

  const loginFail = (req,res)=>{
    res.send("Algo salió mal")
}

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al cerrar sesión');
    } else {
      res.redirect('/login');
    }
  });
};

export default {
  login,
  loginFail,
  register,
  logout
};
