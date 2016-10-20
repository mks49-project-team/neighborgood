var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Accounts = require('./accountsModel.js');

var accounts = function(userData) {
  console.log('JEFFFFFFFFFFFFFFFF', userData.result.nearbyStores)
  new Accounts(
  {
  //   username: hardcoded
    // password: 'hardcoded', JEFF - DON'T FORGET THE COMMA UP HERE
    results:[
    {
     origin: {
        street: userData.result.newAddress.street,
        city: userData.result.newAddress.city,
        state: userData.result.newAddress.state,
        zip: userData.result.newAddress.zip,
        full: userData.result.newAddress.full,
        neighborhood: userData.result.newAddress.neighborhood,
        lat: userData.result.newAddress.lat,
        lng: userData.result.newAddress.lng,
        latlng: userData.result.newAddress.latlng
      },
      destination: {
        street: userData.result.destinationAddress.street,
        city: userData.result.destinationAddress.city,
        state: userData.result.destinationAddress.state,
        zip: userData.result.destinationAddress.zip,
        full: userData.result.destinationAddress.full,
        neighborhood: userData.result.destinationAddress.neighborhood,
        lat: userData.result.destinationAddress.lat,
        lng: userData.result.destinationAddress.lng,
        latlng: userData.result.destinationAddress.latlng
      },
      commute: {
        distance: {
          text: userData.result.commute.distance.text,
          value: userData.result.commute.distance.value
        },
        duration: {
          text: userData.result.commute.duration.text,
          value: userData.result.commute.duration.value
        },
        durationInTraffic: {
          text: userData.result.commute.durationInTraffic.text,
          value: userData.result.commute.durationInTraffic.value
        }
      },
      priorities: {
        crime: userData.result.checkboxes.crimeClicked,
        traffic: userData.result.checkboxes.trafficClicked,
        walkability: userData.result.checkboxes.walkabilityClicked
      }
    //   // crime:
    //   // traffic:

    }]
  }
  ).save(function(error, data) {
    if (error) {
      console.log('error in accountsController in accounts in db:', error);
    } else {
      console.log('successful save to db!');
    }
  })
}

//include a function that gets all data. we can filter on the front end

// also, include a function that utilizes .find()/.findById? for search queries/account logins


module.exports = {
  accounts: accounts
}