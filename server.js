const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('flash');
const Sequelize = require('sequelize');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const winston = require('winston');
const morgan = require('morgan');
require('dotenv').config();
const sessionStore = process.env.SESSION_STORE;
const port = process.env.PORT || 8080;

// Configurations
// ================================================================================================
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080','ubuntu@ec2-54-153-37-9.us-west-1.compute.amazonaws.com'],
  credentials: true,
  //preflightContinue:true,
}));

//loading the static files
//app.use(require('./server/static/static.files'))

// // Handle Static File 404
app.use(function (err, req, res, next) {
  if (err) console.error
  res.sendStatus(404)
});


//require('./server/config/passport')(passport); // pass passport for configuration

// Set up middlewares

// if (process.env.NODE_ENV !== 'test') {
//   app.use(morgan('dev')); // Show logs to users
// }
// cookie parser
app.use(cookieParser());

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({ extended: false })); // Parse POST contents
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(expressValidator());
// passport config
app.use(session({
  secret: process.env.PASSPORT_SESSION_SECRET || 'abc1234', // session secret
  resave: false,
  saveUninitialized: true
}));
// required for passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ==================================================
app.use(require('./server/routes'));

app.listen(port, () => {
  console.log(`Magic happens on port: ${port}`);
});

module.exports = app;