const Org = require('./orgModel');
const Repo = require('./../repo/repoModel');
const repoController = require('./../repo/repoController');

const orgController = {};

orgController.getAllInfo = (req, res) => {
  const allInfo = {};
  Org.find({}, function(err, orgs) {
    if (err) {
      console.log('getting orgs err ', err);
      return res.send(500, err);
    }
    const initialProms = [];
    for (let org of orgs) {
      initialProms.push(combineOrgRepo(org));
    }
    Promise.all(initialProms)
      .then( (newOrgs) => {
        res.jsonp(newOrgs);
      })
      .catch( (err) => console.log(err) )
  });
}

function combineOrgRepo(org) {
  return new Promise((resolve, reject) => {
    Repo.find({orgName: org.name}, (err, reposArr) => {
      if (err) reject('ERR combineOrgRepo');
      org.repos = reposArr;
      resolve(org);
    });
  });
}


orgController.createOrg = (orgObj) => {
  // console.log('ORGANIZATION', organization);
  Org.find({name:orgObj.name}, (err, result) => {
    if (err) console.log('ERR create ORGANIZATION',err);
    if (!result.length) Org.create(orgObj);
  });
}


module.exports = orgController;
