var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var accountsSchema = new Schema({
  // username: String,
  // password: String,
  results: [
  {
    origin: {
      street: String,
      city: String,
      state: String,
      zip: String,
      full: String,
      neighborhood: String,
      lat: String, //or num?
      lng: String, //or num?
      latlng: String
    },
    destination: {
      street: String,
      city: String,
      state: String,
      zip: String,
      full: String,
      neighborhood: String,
      lat: String, //or num?
      lng: String, //or num?
      latlng: String
    },

    commute: {
      distance: {
        text: String,
        value: Number
      },
      duration: {
        text: String,
        value: Number
      },
      durationInTraffic: {
        text: String,
        value: Number
      }
    },
    priorities: {
      crime: Number,
      traffic: Number,
      walkability: Number
    }
    // crime: Number,
    // traffic: Number
    // nearbyRestaurants: [{

    // }],
    // nearbyStores: [{

    // }]
  }]
});

var Accounts = mongoose.model('Accounts', accountsSchema);
module.exports = Accounts;