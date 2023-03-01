import passport from 'passport';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../app.js';

export const postLogin = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({ id: user._id }, jwtSecret);
      return res.json({ token });
    });
  })(req, res);
};