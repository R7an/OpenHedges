const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
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
const port = process.env.PORT || 80;

// Configurations
// ================================================================================================
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:80', 'http://localhost:8022', 'Openhedges-env.f4wniveamn.us-west-1.elasticbeanstalk.com'],
  credentials: true,
  //preflightContinue:true,
}));


//loading the static files
app.use(require('./server/api/config/static.files'))

// // Handle Static File 404
app.use(function (err, req, res, next) {
  if (err) console.error
  res.sendStatus(404)
});

// Set up Mongoose with centralized promise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI).then(() => {
  winston.log('info', 'Successfully connected with mongoose DB');
}).catch((err) => {
  winston.log('error', err);
});
// If the Node process ends, close the Mongoose connection
// see: http://theholmesoffice.com/mongoose-connection-best-practice/
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
});

require('./server/api/config/passport')(passport); // pass passport for configuration

// Set up middlewares

app.use(morgan('short')); // Show logs to users
// cookie parser
app.use(cookieParser());
// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({ extended: true })); // Parse POST contents
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(expressValidator());
// passport and mongo-connect config
if (sessionStore === process.env.SESSION_STORE || 'mongo') {
  app.use(session({
    secret: process.env.PASSPORT_SESSION_SECRET || 'abc1234', // session secret
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }));
} else {
  app.use(session({
    secret: process.env.PASSPORT_SESSION_SECRET || 'abc1234', // session secret
    resave: false,
    saveUninitialized: true
  }));
}

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());

// routes ==================================================
app.use(require('./server/api/routes'));

app.listen(port, () => {
  console.log(`Magic happens on port: ${port}`);
});