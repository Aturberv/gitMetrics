const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const passport = require('passport');
const oAuthPassport = require('./auth');
const session = require('express-session');
const repoController = require('./repo/repoController');

const app = express();

const mongoURI = 'mongodb://teamfirrre:teamfire1@ds245518.mlab.com:45518/teamfirescratchproject';
mongoose.connect(mongoURI);

app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// app.use(passport.initialize());
// app.use(passport.session());

app.get('/getOrganizations', repoController.getAllRepos);

app.get('/auth', oAuthPassport.authenticate('oauth2', { failureRedirect: 'https://www.google.com/' }));

// add logout route that removes user from users collection in db
// app.get('/signout', );

app.get('/', (req, res) => {
  res.redirect('http://localhost:8080/');
})

app.listen(8081, () => {
  console.log("server listening on 8081");
});
