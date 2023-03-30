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
  })(req, res, next); // Agregar el argumento 'next' aquí

  // Agregar el middleware que maneja los errores aquí
  app.use((err, req, res, next) => {
    if (err.status === 401) {
      res.status(401).send('No autorizado');
    } else {
      console.error(err.stack);
      res.status(500).send('Error interno del servidor');
    }
  });
};
