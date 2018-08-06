const path = require('path');
const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;
const config = require('./config');

// Configurations
// ================================================================================================
const app = express();
// Pass mode argument to config

// Set up Mongoose with centralized promise
mongoose.Promise = global.Promise;
mongoose.connect(config.db).then(() => {
  winston.log('info', 'Successfully connect with mongoose DB');
}).catch((err) => {
  winston.log('error', err);
});

// Set up middlewares
app.use(morgan('short')); // Show logs to users
app.use(bodyParser.urlencoded({ extended: true })); // Parse POST contents
app.use(bodyParser.json()); // Parse POST contents


// Include all the routes of modules
//require('./rootRoutes')(app);
// TEST API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
if (process.env.NODE_ENV === 'production') {

}

//Serve any static files
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Fallback to index file if fail
// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  res.end();
});
// === End of production settings ===

// Start server
app.listen(port, host, (err) => {
  if (err) winston.log('error', err);

  winston.log('info', '>>> 🌎 Open http://%s:%s in your browser.', host, port);
});

module.exports = app;