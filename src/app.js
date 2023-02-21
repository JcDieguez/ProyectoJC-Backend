import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mongoose from 'mongoose';
import passport from 'passport';
import initializeStrategies from './config/passport.config.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://juancruz:123@proyectojc.12yzmzn.mongodb.net/proyectoJS?retryWrites=true&w=majority",
    ttl: 20
  }),
  secret: 'aspdiasc903ok1pkc',
  resave: false,
  saveUninitialized: false
}));

//Inicializar el motor.
app.engine('handlebars',handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


initializeStrategies();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`))

export const jwtSecret = 'mi_secreto';