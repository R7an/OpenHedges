const path = require('path');
const winston = require('winston');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const expressValidator = require('express-validator');
require('dotenv').config();
const sessionStore = process.env.SESSION_STORE;
const port = process.env.PORT || 8080;

// Configurations
// ================================================================================================
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8022', 'Openhedges-env.f4wniveamn.us-west-1.elasticbeanstalk.com'],
  credentials: true,
  //preflightContinue:true,
}));

app.use(require('./server/api/config/static.files'))

// Fallback to index file if fail
// Handle React routing, return all requests to React app

// // Handle Static File 404
app.use(function (err, req, res, next) {
  if (err) console.error
  res.sendStatus(404)
});

// Set up Mongoose with centralized promise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI).then(() => {
  winston.log('info', 'Successfully connect with mongoose DB');
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
app.use(function (req, res, next) {
  console.log('this is before parse')
  console.log(req.body)
  next()
})
app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log('this is after parse')
  console.log(req.body)
  next()
})
// parse application/vnd.api+json as json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({ extended: true })); // Parse POST contents
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(expressValidator());
// passport and mongo-connect config
if (sessionStore === "mongo") {
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