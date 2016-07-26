var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../model/User');
var moment = require('moment');

module.exports = function( passport ) {

 // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


passport.use(new FacebookStrategy({
    clientID: '281097618893540',
    clientSecret: '9bc1b84c9018f373952d2639b1a9112e',
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
  },
  function(accessToken, refreshToken, profile, done) {

    // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {



                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    if(user){
                        //1. Check User last login


                        //2. Add point to upline

                        //3. Add point to user
                        // user.latest_login = moment().format('ll');
                        user.save(function(err){
                            if(err)
                                throw (err);
                            return done(null, user); // user found, return that user
                        });
                    }else{

                    }
                    
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = accessToken; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
                    
                    console.dir(profile.emails)


                    if(typeof profile.emails !== 'undefined'){
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    }
                    
                    if(typeof profile.photos !== 'undefined'){
                        newUser.facebook.photo = profile.photos[0].value; // facebook can return multiple emails so we'll take the first
                    }
                    newUser.user_state     = 0 //Set state 0 = new Register
                    newUser.regis_date     = moment().format('l');
                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user

                        // if(req.session.adviser != ''){
                            // Add Point To upline if have
                        // }
                        return done(null, newUser);
                    });
                }

            });
        });
  }
));

}
