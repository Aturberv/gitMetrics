const Org = require('./../orgs/orgModel');

const orgController = {};

orgController.getAllOrgs = (req, res) => {
  Repo.find({}, function(err, orgs) {
    if (err) {
    console.log('getting orgs err ', err);
    return res.send(500, err);
  }
    return res.jsonp(orgs);
  });
}

orgController.createOrg = (organization) => {
  // console.log('ORGANIZATION', organization);
  const orgObj = new Org({
    name:       organization.name.toLowerCase(),
    num_repos:  organization.public_repos,
    avatar_url: organization.avatar_url
  });
  Org.find({name:organization.name.toLowerCase()}, (err, result) => {
    if (!result.length) orgObj.save();
  });
}


module.exports = orgController;
