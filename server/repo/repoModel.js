const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repoSchema = new Schema({
  orgName:         {type: String, required: true},
  name:            {type: String, required: true},
  description:     {type: String},
  open_issues:     {type: Number},
  forks:           {type: Number},
  watchers:        {type: Number},
  languages:       {type: Object},
  contributos:     {type: Array}
});

module.exports = mongoose.model('Repo', repoSchema);
