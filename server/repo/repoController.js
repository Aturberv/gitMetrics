const Repo = require('./repoModel');
const orgController = require('./../orgs/orgController');
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


repoController.createRepos = (organization, allrepos, allLang, allContr) => {
  // console.log(organization, allrepos[4], allLang[4], allContr[4][1]);
  const orgName = organization.name.toLowerCase();
  Repo.find({orgName: orgName}, (err, result) => {
    console.log(result.length, allrepos.length, allLang.length, allContr.length)
    if (result.length !== allrepos.length) {
      Repo.remove({orgName: orgName}, (err) => {
        if (err) console.log('Remove Repo ERR', err);
        createAll();
      });
    }
  });


  function createAll() {
    const arrRepos = [];
    let totalForks = 0;
    let totalWatchers = 0;
    let totalOpenIssues = 0;
    const totalLanguages = {};
    for (let i=0; i < allrepos.length; i++) {
      totalForks += allrepos[i].forks;
      totalWatchers += allrepos[i].watchers;
      totalOpenIssues += allrepos[i].open_issues;
      combineLang(allLang[i]);
      const repoObj = {
        orgName:       orgName,
        repoName:      allrepos[i].name,
        description:   allrepos[i].description,
        open_issues:   allrepos[i].open_issues,
        forks:         allrepos[i].forks,
        watchers:      allrepos[i].watchers,
        languages:     allLang[i],
        contributos:   allContr[i]
      };
      arrRepos.push(repoObj);
    }
    Repo.create(arrRepos, (err, result) => {
      if (err) console.log('Create Repo ERR',err)
      console.log('Repo Length Created: ', result.length);
    });

    const orgObj = {
      name:               orgName,
      num_repos:          organization.public_repos,
      avatar_url:         organization.avatar_url,
      totalForks:         totalForks,
      totalWatchers:      totalWatchers,
      totalOpenIssues:    totalOpenIssues,
      totalLanguages:     totalLanguages
    }
    orgController.createOrg(orgObj);

    function combineLang(langObj) {
      for (let language in langObj) {
        if (totalLanguages[language]) totalLanguages[language] += langObj[language];
        else totalLanguages[language] = langObj[language]
      }
    }
  }

}






module.exports = repoController;
