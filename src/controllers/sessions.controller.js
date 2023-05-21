import UserDAO from '../dao/Mongo/UserDAO.js'
import { validatePassword } from '../utils.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import config from '../config/config.js';

   
    /* router.get('/github', passport.authenticate('github'), (req, res) => { });
    
    router.get('/githubcallback', passport.authenticate('github'), async (req, res) => {
      const user = req.user;
      req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role
      };
      res.redirect('/welcome');
    });
    */
   // 
   const userDAO = new UserDAO();
   const register =  async (req, res) => {
     const { first_name, last_name, email, password } = req.body;
     if (!first_name || !email || !password) {
       return res.status(400).send({ status: "error", error: "Valores incompletos" });
      }
      const existingUser = await userDAO.getBy({email});
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
        const userToken = {
          cart: user.cart,
            name:`${user.first_name} ${user.last_name}`,
            role:user.role,
            id:user._id,
            avatar:user.avatar || 'url genérica'
        };
        const token = jwt.sign(userToken,process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie(process.env.JWT_COOKIE,token).send({status:"success",message:"logged in"})
      } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
      }
    };

  const loginFail = (req,res)=>{
    res.send("Algo salió mal")
}

  export default {
    login,
    loginFail,
    register
}