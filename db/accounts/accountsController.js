var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var Accounts = require('./accountsModel.js');
var jwt = require('jwt-simple');


var signin = function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  Accounts.findOne({username: username})
    .exec(function(err, account){
      if(account !== null){
        if(account.checkPassword(password)){
          console.log('line20 : ', account);
          var payload = {iss: username};
          var token = jwt.encode(payload,'neighborgood_secret');
          res.json({token: token});
        } else{
          // incorrect password
          res.send("incorrect");
        }
      } else {
        // user not found
        res.send("incorrect");
      }
    });
}

var signup = function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  Accounts.findOne({username: username}, function(err, account){
    if(err){
      console.log('error saving new account: ', err);
      res.send(500);
    } else {
      if (account) {
        res.send("exists");
      } else {
        var newAccount = new Accounts({
          username: username,
          password: password
        });
        newAccount.save(function(err, account){
          if(err){
            console.log('error saving new account: ', err);
            res.send(500);
          }
          var payload = {iss: username};
          var token = jwt.encode(payload, 'neighborgood_secret');
          res.json({token: token});
        });
      }
    }
  });
}

var jwtAuthentication = function(req, res, next){
  // middleware function to check for jwt token

  var token = req.headers['authorization'];
  if(token){
    var decoded = jwt.decode(token, 'neighborgood_secret');
    Accounts.findOne({username: decoded.iss})
      .then(function(account){
        if(account){
          req.body.username = account.username;
          next();
        } else { // user doesn't exist
          res.send("Please log in or sign up to view saved searches");
        }
      })
      .catch(function(err){
        console.log('error verifying token: ', err);
        res.send(err);
      });
  } else { // no token
    res.send("Please log in or sign up to view saved searches");
  }
}

var getUserSearches = function(req, res){
  var username = req.params.username;
  Accounts.findOne({username: username})
    .then(function(account){
        res.send(account.results);
    })
    .catch(function(err){
      res.send(err);
    });
}

var postUserSearch = function(req, res){
  var username = req.params.username;
  var search = req.body.search;

  Accounts.findOne({username: username})
    .then(function(account){
      account.results.push(search);
      account.markModified('results');
      account.save();
      res.status(200).json(account.results);
    });
}

module.exports = {
  signin: signin,
  signup: signup,
  jwtAuthentication: jwtAuthentication,
  getUserSearches: getUserSearches,
  postUserSearch: postUserSearch
}
