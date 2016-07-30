var express = require('express');
var router = express.Router();
var User = require('../model/User')
var mongoose = require('mongoose')

/* 
	For Invite 
*/
router.get('/:id', function(req, res, next) {
	try{
		var inviteId = mongoose.Types.ObjectId(req.params.id); // contain inviteId in Variable.
	}catch(err){
		return res.redirect('/');
	}

	User.findOne({_id: inviteId}, function(err, user){
			if (err)
				return err; 

			if (!user){
				/* If select haven't any user */
				return res.redirect('/');
			}

			req.session.invite_id = inviteId
			return res.redirect('/');
	});
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;
