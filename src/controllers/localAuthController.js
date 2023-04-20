import passport from 'passport';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';
import { UnauthorizedError } from '../utils/errors.js';

export const postLogin = (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    try {
      if (err || !user) {
        throw new UnauthorizedError(info.message);
      }

      req.login(user, { session: false }, err => {
        if (err) {
          throw err;
        }

        const token = jwt.sign({ id: user._id }, jwtSecret);
        return res.json({ token });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};