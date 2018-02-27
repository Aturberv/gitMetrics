const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orgSchema = new Schema({
  name:       {type: String, required: true },
  num_repos:  {type: Number},
  avatar_url: {type: String}
});

module.exports = mongoose.model('Org', orgSchema);
