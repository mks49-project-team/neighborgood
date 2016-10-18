// var zipcodes = require('./zipcodesCA.json');
// var crimeData = require('./la_crimes_2015.json');

var getDistance = function(lat1, lat2, lng1, lng2){
  // Haversine formula for calculating distance between two points on a sphere
  var R = 6378.137; // Earth radius in km
  var lat1_rad = lat1 * Math.PI / 180;
  var lat2_rad = lat2 * Math.PI / 180;
  var lng1_rad = lng1 * Math.PI / 180;
  var lng2_rad = lng2 * Math.PI / 180;

  var a = 0.5 * (lat2_rad - lat1_rad);
  var b = Math.cos(lat1_rad) * Math.cos(lat2_rad);
  var c = Math.sin(0.5 * (lng2 - lng1));

  var d = 2 * R * Math.arcsin(Math.sqrt(Math.pow(a, 2) + b * Math.pow(c, 2)));

  return d;
}


var x = [33.87,-118.05,34.019,-118.49];

console.log(getDistance(x));
