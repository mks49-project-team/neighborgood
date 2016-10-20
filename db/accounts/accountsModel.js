var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var accountsSchema = new Schema({
  username: String,
  password: String,
  results:[{

  }]
});

var Accounts = mongoose.model('Accounts', accountsSchema);
module.exports = Accounts;