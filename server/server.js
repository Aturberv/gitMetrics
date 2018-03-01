const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
// const passport = require('passport');
// const oAuthPassport = require('./auth');
// const session = require('express-session');
const repoController = require('./repo/repoController');
const orgController = require('./orgs/orgController');
const userController = require('./user/userController');

const app = express();

const mongoURI = 'mongodb://iterationDeep:teamiterationdeep1@ds249798.mlab.com:49798/iteration_deep';
mongoose.connect(mongoURI);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/getAllInfo', orgController.getAllInfo);


// app.get('/', userController.getToken,
//              userController.getOneOrg,
//              userController.getReposInfo,
//              userController.langAndContr,
//              redirectToClientServer);

app.get('/', redirectToClientServer);





function redirectToClientServer(req, res) {
  res.redirect('http://localhost:8080/');
}

app.listen(8081, () => {
  console.log("server listening on 8081");
});
