var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var accountsSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  results: [Schema.Types.Mixed]
});

accountsSchema.pre('save', function(next){
  // hash passwords before saving new user
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});
accountsSchema.methods.checkPassword = function(pw){
  return bcrypt.compareSync(pw, this.password);
}
var Accounts = mongoose.model('Accounts', accountsSchema);

// Accounts.pre('save')
module.exports = Accounts;
