// =============================
// Requirements
// =============================
var express = require('express');
var	app = express();
var	port = process.env.PORT || 3000;
var	logger = require('morgan');
var	mongoose = require('mongoose');
var	bodyParser = require('body-parser');
var	md5 = require('md5');
var	cookieParser = require('cookie-parser');


// =============================
// Middleware
// =============================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));


app.use(cookieParser());

// =============================
// DB
// =============================
mongoose.connect('mongodb://localhost/boots_cats_dev');

// ============================================
// Models
// ============================================
var User = require('./models/user');
var Track = require('./models/track');

// =============================
// Listen
// =============================
app.listen(port);
console.log('Server started at port: ' + port);

// =============================
// Routes
// =============================

// ============================================
// Add new user
// ============================================

app.post('/users', function(req, res) {

  password_hash = md5(req.body.password);

  var user = new User({
    email: req.body.email,
    password_hash: password_hash,
  });

  user.save(function(err) {
    if (err){
      console.log(err);
      res.statusCode = 503;
    }else{

      console.log(user.email + ' created!');

      res.cookie('loggedinId', user.id);

      res.send({
        id: user.id,
        username: user.username,
        created_at: user.created_at
      });
    }
  });
});

// ============================================
// Login
// ============================================

app.post('/login', function(req, res) {
    var requestEmail = req.body.email;
    var requestPassword = req.body.password;

    User.findOne({"email": requestEmail}).exec(function(err, user) {
        var requestPasswordHash = md5(requestPassword);
        if (user != null && requestPasswordHash == user.password_hash) {
            res.cookie('loggedinId', user.id);
            res.send({
              id: user.id,
              email: user.email
            });
        } else {
            res.status(400);
            res.send("didn't work :(");
        }
    })
});

app.get('/users/:id', function(req, res) {
  User.findById(req.params.id).exec(function(err, user) {
    if (err) {
      console.log(err);
      res.statusCode = 503;
    } else {
      
      res.send({
        id: user.id,
        email: user.email,
        password: user.password_hash,
      })
    };
  });
});

