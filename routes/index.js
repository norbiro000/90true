var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: '90True.com' });
});

/* main page after login */
router.get('/main', isLoggedIn, function(req, res, next) {
 	res.render('main');
});

/* logout */
router.get('/logout', isLoggedIn, function(req, res, next) {
 	req.logout()
	res.redirect('/');
});


/* login check */
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;
