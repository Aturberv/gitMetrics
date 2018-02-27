var mongoose = require('mongoose');
var Schema = mongoose.Schema;



const User = new Schema({
  name: String,
  someID: String
}, { collection: 'user' });


module.exports = mongoose.model('users', User);
