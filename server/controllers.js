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

    var originArr = req.query.origin
    var destinationArr = req.query.destination


    googleMapsClient.directions({
      origin: originArr,
      destination: destinationArr
    }, function(err, response) {
      if (err) {
        console.log('error in getDirections in controllers.js:', err)
      }
      res.send(response)
    })

  }


}
module.exports = {
  controller: controller
}
