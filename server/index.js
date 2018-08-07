const path = require('path');
const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const expressValidator = require('express-validator');
const sessionStore = process.env.SESSION_STORE;
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;
const config = require('./config');



// Configurations
// ================================================================================================
const app = express();


//Serve any static files
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Fallback to index file if fail
// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  res.end();
});


// Pass mode argument to config

// Set up Mongoose with centralized promise
mongoose.Promise = global.Promise;
mongoose.connect(config.db).then(() => {
  winston.log('info', 'Successfully connect with mongoose DB');
}).catch((err) => {
  winston.log('error', err);
});
// If the Node process ends, close the Mongoose connection
// see: http://theholmesoffice.com/mongoose-connection-best-practice/
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
      console.log('Mongoose default connection disconnected through app termination')
      process.exit(0)
  })
});

require('./api/passport/passport')(passport); // pass passport for configuration

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

// passport and mongo-connect config
if (sessionStore === "mongo") {
  app.use(session({
      secret: process.env.PASSPORT_SESSION_SECRET || 'abc1234', // session secret
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({mongooseConnection: mongoose.connection})
  }));
} else {
  app.use(session({
      secret: process.env.PASSPORT_SESSION_SECRET || 'abc1234', // session secret
      resave: false,
      saveUninitialized: true
  }));
}
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Include all the routes of modules
// routes ==================================================
app.use(require('./api/routes'));



// Start server
app.listen(port, host, (err) => {
  if (err) winston.log('error', err);

  winston.log('info', `>>> 🌎 Open http://${host}:${port} in your browser.`);
});

module.exports = app;