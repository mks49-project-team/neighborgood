var request = require('request');
var crime = require('../crimeData/crimeStats.js');
var _ = require('lodash');

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
			radius : 600,
			rankBy : 'distance',
			type : 'restaurant'
		}, function(err, response) {
			if (err) {
				console.log(err, 'error getRestarantLocation controller.js')
			}
			//console.log(response.json, 'this is what i send from placesNarby');
			res.send(response.json);
		})
	},

	//uses googlePlaces to grab nearest 5 stores to our map location
	getStoreLocation : function(req, res) {

		var latlng = req.query.latlng;

		googleMapsClient.placesNearby({
			location : latlng,
			radius : 600,
			rankBy : 'distance',
			type : 'store'
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
		var options = {
			method: 'GET',
			uri: 'https://maps.googleapis.com/maps/api/directions/json',
			qs: {
				origin: originLat + ',' + originLng,
				destination: destinationLat + ',' + destinationLng,
				key: process.env.GOOGLE_API_KEY,
				departure_time: 1477494000
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
		console.log('JEFFF req.query:', req.query)
		// get population density
		// var userInfo = req.query;
		var lat = req.query.latitude;
		var lng = req.query.longitude;
		var populationDensity; // km-2
		var getCrimeScore = function(crimeRates){
			var crimeRatesSanBernardino = { // most dangerous city
				homicide: 20.04,
				rape: 48.46,
				robbery: 377.93,
				assault: 545.23
			};
			var crimeRatesIrvine = { // safest city
				homicide: 0,
				rape: 11.52,
				robbery: 14.82,
				assault: 2.3
			};
			// assign score to crime based on seriousness of offense
			var diffs = {};
			for(key in crimeRates){
				if(crimeRates[key] > crimeRatesSanBernardino[key]){
					diffs[key] = 1;
				} else if (crimeRates[key] < crimeRatesIrvine[key]){
					diffs[key] = 0;
				} else {
					diffs[key] = (crimeRates[key] - crimeRatesIrvine[key]) / (crimeRatesSanBernardino[key] - crimeRatesIrvine[key]);
				}
			}
			// assign weights to each category based on seriousness of offense
			var score = (4 * diffs.homicide + 3 * diffs.rape + 2 * diffs.robbery + 1 * diffs.assault) / 10;
			return score;
		}

		var options = {
			method: 'GET',
			url: 'http://www.datasciencetoolkit.org/coordinates2statistics/' + lat + '%2c' + lng,
			qs: {
				statistics : 'population_density'
			}
		}
		request(options, function(err, response, body){
			if (err) {
				console.log('error getting population density: ', err);
				res.send(err);
			}
			populationDensity = JSON.parse(body)[0].statistics.population_density.value;
			var population = Math.PI * Math.pow(5, 2) * populationDensity;
			console.log(population);
			var crimeData = crime.getCrimeRatesForLocation({latitude: lat, longitude: lng}, 5);
			var crimeRates = {};
			_.each(crimeData, function(value, key){
				crimeRates[key] = (value / population * 100000).toPrecision(2);
			});

			console.log(crimeRates);
			res.json(getCrimeScore(crimeRates));
		});

	}

}

module.exports = {
  controller: controller
}
