var express = require('express');
var router = express.Router();
var controller = require('./controllers.js').controller;

router.get('/crime', controller.getCrime);

module.exports = {
  router: router
}
