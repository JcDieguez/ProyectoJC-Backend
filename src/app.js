import express from 'express';
import session from 'express-session';
import viewRouter from './routes/views.router.js';
import sessionRouter from './routes/sessions.router.js';
import {initializeStrategies} from '../src/config/passport.config.js'
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import minimist from 'minimist';
import editProfileRouter from './routes/editProfile.router.js';
import passport from './config/passport.config.js';

dotenv.config();

const app = express();

// Obtener el puerto desde los argumentos de la línea de comandos
const args = minimist(process.argv.slice(2));
const PORT = args.port || process.env.PORT || 8080;

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
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(editProfileRouter);


app.use(passport.initialize());
app.use(passport.session());
initializeStrategies(); // llamando a la funcion para inicializar las estrategias

app.use('/', viewRouter);
app.use('/api/sessions', sessionRouter);

app.use((err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).send('No autorizado');
  } else {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
  }
});


//GENERAR NUMEROS RANDOMS:
import randomsRouter from './routes/randoms.router.js';
app.use('/api/randoms', randomsRouter);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));