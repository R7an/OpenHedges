const express = require('express');
const app = express();
const path = require('path');

module.exports = app;

//static files for the single page application
app.use( express.static(path.join(__dirname, '../../../build')))