var request = require('request');
//var crime = require('../crimeData/crimeStats.js');
var neighborhoodScore = require('./neighborhoodScore.js');
var accountsController = require('./../db/accounts/accountsController.js');



var googleMapsClient = require('@google/maps').createClient({
	key: process.env.GOOGLE_API_KEY
});

var controller = {
	//uses googleMapsClient to grab location data from input
 	getGeoLocation : function(req, res) {
		var newAddress = req.query.newAddress;

		googleMapsClient.geocode({
			address: newAddress
			}, function(err, response) {
				if (err) {
					console.log(err, 'error feching geoCode on startup');
				}
				//console.log(response.json.results, 'this is resuts from geoCode Google')
				res.send(response.json.results)
			})
	},

	//uses googlePlaces to grab nearest 5 restaurants to our map location
	getRestaurantLocation : function(req, res) {

		var latlng = req.query.latlng;

		googleMapsClient.placesNearby({
			location : latlng,
			radius : 1000,
			rankBy : 'distance',
			type : 'restaurant'
		}, function(err, response) {
			if (err) {
				console.log(err, 'error getRestarantLocation controller.js')
			}
			res.send(response.json);
		})
	},

	//uses googlePlaces to grab nearest 5 stores to our map location
	getStoreLocation : function(req, res) {

		var latlng = req.query.latlng;

		googleMapsClient.placesNearby({
			location : latlng,
			radius : 1000,
			rankBy : 'distance',
			type : 'grocery_or_supermarket'
		}, function(err, response) {
			if (err) {
				console.log(err, 'error getStoreLocation controller.js')
			}
			console.log(response.json, 'this is what i send from placesNarby getStoreLocation');
			res.send(response.json);
		});
	},

  getDirections : function(req, res) {

    var originLat = req.query.originLat
    var originLng = req.query.originLng
    var destinationLat = req.query.destinationLat
    var destinationLng = req.query.destinationLng
		var getMonday = function(date) {
	    var day = date.getDay();
	    if (day !== 1) {
	    	date.setHours((24*(8-day)) + 8);
	    } else {
	    	date.setHours((24*7)+8);
	    }
	    return Math.round(date.getTime()/1000);
		};
		var options = {
			method: 'GET',
			uri: 'https://maps.googleapis.com/maps/api/directions/json',
			qs: {
				origin: originLat + ',' + originLng,
				destination: destinationLat + ',' + destinationLng,
				key: process.env.GOOGLE_API_KEY,
				departure_time: getMonday(new Date())
			}
		}

		request(options, function(error, response, body) {
			if (error) {
				console.log('theres an error in getDirections in controllers:', error)
			} else {
				res.send(body)
			}
		});

	},

	getScore : function(req, res) {

		neighborhoodScore.getScores(req, res);

	},

	signin : function(req, res) {
		accountsController.signin(req, res);
	},

	signup : function(req, res) {
		// res.send('signup');
		accountsController.signup(req, res);
	},

	getAccounts: function(req, res) {
		accountsController.getAccounts(req, res);
	},

	getUserSearches: function(req, res) {
		accountsController.getUserSearches(req, res);
	},

	postUserSearch: function(req, res) {
		accountsController.postUserSearch(req, res);
	}

}

module.exports = {
  controller: controller
}
