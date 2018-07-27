var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Vehicle = require('./Vehicle');


if (req.body.username && req.body.password) {
  var userData = {
   
    username: req.body.username,
    password: req.body.password
  }
    //Create a new user
    router.post('/', function (req, res) {
      User.create(userData, function (err, user) {
        if (err) {
          return next(err)
        } else {
          return res.redirect('/profile');
        }
      });
    }
}