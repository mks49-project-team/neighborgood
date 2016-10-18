var request = require('request');

var googleMapsClient = require('@google/maps').createClient({
	key: process.env.GOOGLE_API_KEY
});

var controller = {
	//uses googleMapsClient to grab location data from input
 	getGeoLocation : function(req, res) {
	console.log(req.body, 'this is req.body in startup server')
	var newAddress = req.query.newAddress;

	googleMapsClient.geocode({
		address: newAddress
	}, function(err, response) {
		if (err) {
			console.log(err, 'error feching geoCode on startup');
		}
		console.log(response.json.results, 'this is resuts from geoCode Google')
		res.send(response.json.results)
	})
},

  getDirections : function(req, res) {

    var originLat = req.query.originLat
    var originLng = req.query.originLng
    var destinationLat = req.query.destinationLat
    var destinationLng = req.query.destinationLng

    //serg wants the duration regular, regular and in traffic

    var apiUrl = {
      method: 'GET',
      uri: 'https://maps.googleapis.com/maps/api/directions/json',
      qs: {
        origin: originLat + ',' + originLng,
        destination: destinationLat + ',' + destinationLng,
        key: process.env.GOOGLE_API_KEY,
        departure_time: 1477494000
      }
    }

    request(apiUrl, function(error, response, body) {
      if (error) {
        console.log('theres an error in getDirections in controllers:', error)
      } else {
        res.send(body)
      }
    })
  }
}

module.exports = {
  controller: controller
}
