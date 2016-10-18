var express = require('express');
var controller = require('./controllers.js').controller;
var router = express.Router();

// route to grab google GeoLoc from address
router.get('/geoLocation', controller.getGeoLocation);
router.get('/restaurantLocation', controller.getRestaurantLocation);
router.get('/storeLocation', controller.getStoreLocation);

module.exports = {
  router: router
};
