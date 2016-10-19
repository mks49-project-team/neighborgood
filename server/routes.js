var express = require('express');
var controller = require('./controllers.js').controller;
var router = express.Router();
var controller = require('./controllers.js').controller;


// route to grab google GeoLoc from address
router.get('/geoLocation', controller.getGeoLocation);
router.get('/restaurantLocation', controller.getRestaurantLocation);
router.get('/storeLocation', controller.getStoreLocation);
//router.get('/crime', controller.getCrime);
router.get('/directions', controller.getDirections);

module.exports = {
  router: router
};
