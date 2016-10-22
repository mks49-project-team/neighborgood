var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var Accounts = require('./accountsModel.js');
var jwt = require('jwt-simple');


var signin = function(req, res){
  var username = req.body.username;
  var password = req.body.password;


  Accounts.findOne({username: username})
    .then(function(account){
      if(!account){
        // user not found
        res.send("incorrect");
      } else {
        // check password
        if(account.checkPassword(password)){
          var payload = {iss: username};
          var token = jwt.encode(payload,'neighborgood_secret'); /*app.get('jwtTokenSecret'*));*/
          res.json({token: token});
        } else{
          // incorrect password
          res.send("incorrect");

        }

      }
    })
    .catch(function(err){
      console.log('error signing in: ', err);
      res.send(500);
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
        console.log('user already exists: ', account);
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

  var token = req.headers['x-access-token'];
  if(token){
    var decoded = jwt.decode(token, 'neighborgood_secret');
    Accounts.findOne({username: decoded.iss})
      .then(function(account){
        if(account){
          req.body.username = account.username;
          next();
          //res.send(200);
        } else { // user doesn't exist
          res.send(401);
        }
      })
      .catch(function(err){
        console.log('error verifying token: ', err);
        res.send(err);
      });
  } else { // no token
    res.send(401);
  }
}

var getAccounts = function(req, res){
  // res.send('get')
  Accounts.find({}, function(err, accounts){
    res.send(accounts);
  });
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

// var accounts = function(userData) {
//   console.log('JEFFFFFFFFFFFFFFFF', userData.result.nearbyStores)
//   new Accounts(
//   {
//   //   username: hardcoded
//     // password: 'hardcoded', JEFF - DON'T FORGET THE COMMA UP HERE
//     results:[
//     {
//      origin: {
//         street: userData.result.newAddress.street,
//         city: userData.result.newAddress.city,
//         state: userData.result.newAddress.state,
//         zip: userData.result.newAddress.zip,
//         full: userData.result.newAddress.full,
//         neighborhood: userData.result.newAddress.neighborhood,
//         lat: userData.result.newAddress.lat,
//         lng: userData.result.newAddress.lng,
//         latlng: userData.result.newAddress.latlng
//       },
//       destination: {
//         street: userData.result.destinationAddress.street,
//         city: userData.result.destinationAddress.city,
//         state: userData.result.destinationAddress.state,
//         zip: userData.result.destinationAddress.zip,
//         full: userData.result.destinationAddress.full,
//         neighborhood: userData.result.destinationAddress.neighborhood,
//         lat: userData.result.destinationAddress.lat,
//         lng: userData.result.destinationAddress.lng,
//         latlng: userData.result.destinationAddress.latlng
//       },
//       commute: {
//         distance: {
//           text: userData.result.commute.distance.text,
//           value: userData.result.commute.distance.value
//         },
//         duration: {
//           text: userData.result.commute.duration.text,
//           value: userData.result.commute.duration.value
//         },
//         durationInTraffic: {
//           text: userData.result.commute.durationInTraffic.text,
//           value: userData.result.commute.durationInTraffic.value
//         }
//       },
//       priorities: {
//         crime: userData.result.checkboxes.crimeClicked,
//         traffic: userData.result.checkboxes.trafficClicked,
//         walkability: userData.result.checkboxes.walkabilityClicked
//       }
//     //   // crime:
//     //   // traffic:
//
//     }]
//   }
//   ).save(function(error, data) {
//     if (error) {
//       console.log('error in accountsController in accounts in db:', error);
//     } else {
//       console.log('successful save to db!');
//     }
//   })
// }

//include a function that gets all data. we can filter on the front end

// also, include a function that utilizes .find()/.findById? for search queries/account logins


module.exports = {
  // accounts: accounts
  signin: signin,
  signup: signup,
  jwtAuthentication: jwtAuthentication,
  getAccounts: getAccounts,
  getUserSearches: getUserSearches,
  postUserSearch: postUserSearch
}
