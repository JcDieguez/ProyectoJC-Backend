import passport from 'passport';
import local from 'passport-local';
import { usersService } from '../dao/index.js';
import { validatePassword } from '../utils.js';
import GithubStrategy from 'passport-github2';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getUserById } from '../controllers/user.controller.js';

 export function initializeStrategies() {
  passport.use(new local.Strategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await usersService.getBy({ email });
    if (!user) {
      return done(null, false, { message: 'El usuario no existe' });
    }
    const isValidPassword = await validatePassword(password, user.password);
    if (!isValidPassword) {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }
    return done(null, user);
  }));
  const options = {
    secretOrKey: 'aspdiasc903ok1pkc', // reemplaza con tu clave secreta compartida
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };
  
  passport.use(new JwtStrategy(options, async( jwtPayload, done) => {
    try {
      const user = await getUserById(jwtPayload.sub);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }));
  
  passport.use('github', new GithubStrategy({
    clientID: "Iv1.9c8455b387ae0759",
    clientSecret: "4a1c42a63f6c89077668ed5d21e6325d55fae925",
    callbackURL: "http://localhost:8080/api/sessions/githubcallback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      const { name, email } = profile._json;
      const user = await usersService.getBy({ email });
      if (!user) {
        const newUser = {
          first_name: name,
          email,
          password: ''
        }
        const result = await usersService.save(newUser);
        return done(null, result);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    done(null, { token });
  });

  passport.deserializeUser(async (payload, done) => {
    const { token } = payload;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const result = await usersService.getBy({ _id: decoded._id });
      done(null, result);
    } catch (error) {
      done(error);
    }
  });
}

initializeStrategies(); // llamando a la función para inicializar las estrategias

export default passport;
