var express = require('express');
var router = express.Router();
var User = require('../model/User')
var mongoose = require('mongoose')

router.get('/', isLoggedIn, function(req, res, next) {

	if (!req.user){
		return res.redirect('/')
	}

	if (req.user.user_state == 0){
		/* Check user state if new user state = 0*/
		signUpProcess (req, res, next);
		
	}

	if (req.user.user_state == 1){
		/* Check user state if old user state = 1*/
		signIn (req, res, next);
	}

});

router.get('/test', isLoggedIn, function(req, res, next) {
	res.send(req.session)
});

function signUpProcess(req, res, next){
	var user_id = req.user._id;
	User.findOne({_id: user_id}, function(err, user){
		if (typeof req.session.invite_id !== 'undefined'){
			/* has invite */
			var invite_id = req.session.invite_id
			
			user.upline_id = invite_id;
			user.user_state = 1;

			user.save(function(err){
				if(err)
					throw (err);

				res.redirect('/login')
			});
			// res.send(user)
		}else{
			/* 
				hasn't invite 
				set state  only
			*/
			user.user_state = 1;

			user.save(function(err){
				if(err)
					throw (err);

				res.redirect('/login')
			});
		}
	});
}

function signIn(req, res, next){
	req.session.name = req.user.facebook.name
	res.redirect('/main')
}



function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;