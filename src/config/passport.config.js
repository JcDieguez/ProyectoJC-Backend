import passport from 'passport';
import local from 'passport-local';
import { usersService } from '../dao/index.js';
import { validatePassword } from '../utils.js';
import GithubStrategy from 'passport-github2';

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
  done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
  const result = await usersService.getBy({ _id: id });
  done(null, result);
});

export default function initializeStrategies() {
  passport.initialize();
  passport.session();
} 