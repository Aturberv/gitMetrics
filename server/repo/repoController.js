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


repoController.createRepos = (orgName, allrepos, allLang, allContr) => {
  Repo.find({orgName: orgName}, (err, result) => {
    console.log(result.length, allrepos.length, allLang.length, allContr.length)
    if (result.length !== allrepos.length) {
      if (result.length !== 0) Org.remove({orgName: orgName}, (err) => {
        if (err) console.log('Remove Repo ERR', err);
        else createAll();
      });
    }
  });

  function createAll() {
    const arrRepos = [];
    for (let i=0; i < allrepos.length; i++) {
      const repoObj = new Repo({
        orgName:       orgName
        // repoName:
      });

    }

  }



}

// repoName:        {type: String, required: true},
// forks:           {type: Number},
// open_issues:     {type: Number}, // (# of issues open)
// watchers:        {type: Number}, // (# of watchers open)
// url:             {type: String}, // (actual url of repo)
// description:     {type: String},
// languages:       {type: Array},
// issues:          {type: Array},
// avatar:          {type: String}






module.exports = repoController;
