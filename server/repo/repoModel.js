const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repoSchema = new Schema({
  forks: {type: Number}, // (# of forks)
  open_issues: {type: Number}, // (# of issues open)
  watchers: {type: Number}, // (# of watchers open)
  url: {type: String}, // (actual url of repo)
  description: {type: String},
  languages: {type: Array},
  issues: {type: Array},
  org: {type: String},
  name: {type: String },
  avatar: {type: String}
});

module.exports = mongoose.model('Repo', repoSchema);
