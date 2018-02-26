const Repo = require('./repoModel');

const repoController = {};

repoController.getAllRepos = (req, res) => {
  Repo.find({}, function(err, repos) {
    if (err) {
    console.log('err ', err);
    return res.send(500, err);
  }
    return res.jsonp(repos);
  });
}


module.exports = repoController;
