var express = require('express');
var controller = require('./controllers.js').controller;
var router = express.Router();
var controller = require('./controllers.js').controller;


// route to grab google GeoLoc from address
router.get('/geoLocation', controller.getGeoLocation);
router.get('/restaurantLocation', controller.getRestaurantLocation);
router.get('/storeLocation', controller.getStoreLocation);
router.get('/directions', controller.getDirections);
router.get('/score', controller.getScore);
// router.post('/post', controller.postData)
router.post('/users/signin', controller.signin);
router.post('/users/signup', controller.signup);
router.get('/users/accounts', controller.getAccounts);

module.exports = {
  router: router
};
