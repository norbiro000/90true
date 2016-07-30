var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.send('EEIE');
	// if(isLoggedIn){
	// 	res.redirect('/test');
	// }else{
		res.render('index', { title: 'Express' });
	// }
});


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;
