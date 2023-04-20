import express from 'express';
import session from 'express-session';
import viewRouter from './routes/views.router.js';
import sessionRouter from './routes/sessions.router.js';
import { initializeStrategies } from './config/passport.config.js';
import path from 'path';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import editProfileRouter from './routes/editProfile.router.js';
import passport from 'passport';


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 20
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

//Inicializar el motor.
app.engine('handlebars',handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
initializeStrategies();

app.use('/', viewRouter);
app.use('/api/sessions', sessionRouter);
app.use(editProfileRouter);

app.use((err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).send('No autorizado');
  } else {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
