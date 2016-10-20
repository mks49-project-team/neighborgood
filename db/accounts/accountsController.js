var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Accounts = require('./AccountsModel.js');

var accounts = function() {
  new Accounts({
    username:
    password:
    results:[{

    }]
  }).save(function(error, data) {
    if (error) {
      console.log('error in accountsController in accounts in db:', error);
    } else {
      console.log('successful save to db!');
    }
  })
}

//include a function that utilizes .find() for search queries/account logins


module.exports = {
  accounts: accounts
}