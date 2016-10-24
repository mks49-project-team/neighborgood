var express = require('express');
var controller = require('./controllers.js').controller;
var jwtAuthentication = require('../db/accounts/accountsController.js').jwtAuthentication;
var router = express.Router();

// route to grab google GeoLoc from address
router.get('/geoLocation', controller.getGeoLocation);
router.get('/restaurantLocation', controller.getRestaurantLocation);
router.get('/storeLocation', controller.getStoreLocation);
router.get('/directions', controller.getDirections);
router.get('/score', controller.getScore);
router.post('/users/signin', controller.signin);
router.post('/users/signup', controller.signup);
router.get('/users/:username/searches'/*, jwtAuthentication*/, controller.getUserSearches);
router.post('/users/:username/searches'/*, jwtAuthentication*/, controller.postUserSearch);

module.exports = {
  router: router
};
