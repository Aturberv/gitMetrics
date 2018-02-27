const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repoSchema = new Schema({
  orgName:         {type: String, required: true},
  repoName:        {type: String, required: true},
  forks:           {type: Number},
  open_issues:     {type: Number}, // (# of issues open)
  watchers:        {type: Number}, // (# of watchers open)
  url:             {type: String}, // (actual url of repo)
  description:     {type: String},
  languages:       {type: Array},
  issues:          {type: Array},
  avatar:          {type: String}
});

module.exports = mongoose.model('Repo', repoSchema);
