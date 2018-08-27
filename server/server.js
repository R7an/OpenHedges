const express = require('express');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const flash = require('flash');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const winston = require('winston');
const morgan = require('morgan');
require('dotenv').config();
const sessionStore = process.env.SESSION_STORE;
const port = process.env.PORT || 8080;

// Configurations
// ================================================================================================
const app = express();

// Set up middlewares

// Helmet Security Middleware
app.use(helmet());

// CORS Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080','ubuntu@ec2-54-153-37-9.us-west-1.compute.amazonaws.com'],
  credentials: true,
  //preflightContinue:true,
}));

// Logging Middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev')); 
}

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // Parse POST contents
app.use(cookieParser());

// Express Session
app.use(expressSession({
  secret: process.env.PASSPORT_SESSION_SECRET || 'abc1234', // session secret
  resave: false,
  saveUninitialized: false
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator());

// Connect Flash
app.use(flash());

// Global Variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('sucess_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Set Static Files
app.use(require('./static/static.files'))

// Routes
app.use(require('./routes'));

// Handle Static File 404
app.use(function (err, req, res, next) {
  if (err) console.error
  res.sendStatus(404)
});

// Set Port
app.listen(port, () => {
  console.log(`Magic happens on port: ${port}`);
});

module.exports = app;