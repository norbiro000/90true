var express = require('express');
var router = express.Router();
var UserCtrl = require('')

/* GET home page. */
router.get('/:id', function(req, res, next) {
	res.render('index', { title: 'Express' });
});




function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;
