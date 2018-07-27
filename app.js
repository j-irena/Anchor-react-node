var express = require('express');
var app = express();
require('dotenv').config();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);

// ADD THESE TWO LINES
var VehicleController = require('./routes/VehicleController');
app.use('/vehicles', VehicleController);
module.exports = app;

