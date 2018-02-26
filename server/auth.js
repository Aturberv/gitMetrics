const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const User = require('./user/userModel');
const init = require('./init');
const ids = require('./_config')
const clientID = ids.clientID//process.env.GH_CLIENT_ID;
const clientSecret = ids.clientSecret //process.env.GH_CLIENT_SECRET;


passport.use(new OAuth2Strategy({
    authorizationURL: 'https://github.com/login/oauth/authorize',
    tokenURL: 'https://github.com/login/oauth/access_token',
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: 'https://localhost:8080/',
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(User)
    User.create({ someID: profile.id }, function (err, user) {
      console.log('findOrCreate')
      return cb(err, user);
    })
  })
);

init();

module.exports = passport;
