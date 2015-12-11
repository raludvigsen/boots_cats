// =============================
// Requirements
// =============================
var express = require('express'),
		app = express(),
		port = process.env.PORT || 3000,
		logger = require('morgan'),
		mongoose = require('mongoose'),
		bodyParser = require('body-parser');


// =============================
// Middleware
// =============================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));


// =============================
// DB
// =============================
mongoose.connect('mongodb://localhost/boots_cats_dev');

// =============================
// Listen
// =============================
app.listen(port);
console.log('Server started at port: ' + port);

// =============================
// Routes
// =============================





