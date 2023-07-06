const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID : "19853845185-nk8cl917cbukhbodhmebgfim24v0ai9f.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:8000/users/auth/google/callback"
},

function(accessToken,refreshToken,profile,done){// *find a user 
  
    //*if found set this user as request.user
    User.findOne({email : profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy passport',err);
            return;
        }
        console.log(profile);
        if(user){
              return done(null,user);
        }
        else{
              //*  if not found  create a user and set it as request.user
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes.toString('hex')
            },
            function(err){
                if(err){console.log('error in creating user google strategy passport',err);return;}

                return done(null,user);
            }
            )
        }
    });

}

));

module.exports = passport;

