//var geolib = require('geolib');

var crimes = require('./crimeDataLA-2015.json');

var convertCoord = function(s){
  var coord = s.slice(1, -1).split(' ');
  coord[0] = coord[0].slice(0,-1);
  return {
    latitude: parseFloat(coord[0]),
    longitude: parseFloat(coord[1])
  };
}
var getDistance = function(lat1, lon1, lat2, lon2){
  // Implementation taken from stackoverflow (Haversine formula)
  // http://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
  var R = 6371; // km
  var dLat = (lat2-lat1)*Math.PI/180;
  var dLon = (lon2-lon1)*Math.PI/180;
  var lat1 = lat1*Math.PI/180;
  var lat2 = lat2*Math.PI/180;

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

var getCrimesWithinRadius = function(center, radius){
  var crimeResults = [];
  for (var i = 0; i < crimes.length; i++){
    if(crimes[i].geolocation.indexOf('0.0,') !== -1) {
      // skip entries with reported locations of (0, 0)
      continue;
    }
    var crimeCoord = convertCoord(crimes[i].geolocation);
    var d = getDistance(crimeCoord.latitude, crimeCoord.longitude, center.latitude, center.longitude);
    console.log(d);
    if(d < radius){
      crimeResults.push(crimes[i]);
    }
  }
  return crimeResults;
}

var x = {latitude: 33.9668, longitude: -118.4912};
var y = getCrimesWithinRadius(x, 3);
console.log(y.length);
