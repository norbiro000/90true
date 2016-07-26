var express = require('express');
var router = express.Router();

var passport = require('passport');
require('../config/passport')(passport); // pass passport for configuration

router.get('/', function(req, res, next) {

  	res.render('index', { title: 'Express' });
});

router.get('/facebook',
  passport.authenticate('facebook', { scope : ['email', 'user_friends','public_profile'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect : '/checkLogin', failureRedirect : '/google'}));

// }

module.exports = router;