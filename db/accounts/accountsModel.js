var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var accountsSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  results: [Schema.Types.Mixed]
  // results: [
  // {
  //   origin: {
  //     street: String,
  //     city: String,
  //     state: String,
  //     zip: String,
  //     full: String,
  //     neighborhood: String,
  //     lat: Number, //or num?
  //     lng: Number, //or num?
  //     latlng: String
  //   },
  //   destination: {
  //     street: String,
  //     city: String,
  //     state: String,
  //     zip: String,
  //     full: String,
  //     neighborhood: String,
  //     lat: Number, //or num?
  //     lng: Number, //or num?
  //     latlng: String
  //   },
  //
  //   commute: {
  //     distance: {
  //       text: String,
  //       value: Number
  //     },
  //     duration: {
  //       text: String,
  //       value: Number
  //     },
  //     durationInTraffic: {
  //       text: String,
  //       value: Number
  //     }
  //   },
  //   priorities: {
  //     safety: Number,
  //     commute: Number,
  //     walkability: Number
  //   },
  //   neighborhoodResult: {
  //     safety: Number,
  //     commute: Number,
  //     walkability: Number
  //   }
  //   // crime: Number,
  //   // traffic: Number
  //   // nearbyRestaurants: [{
  //
  //   // }],
  //   // nearbyStores: [{
  //
  //   // }]
  // }]
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
