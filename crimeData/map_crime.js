var geolib = require('geolib');
var neighborhoodBoundaries = require('./neighborhoodBoundaries.json');
var crimes = require('./crimeDataLA-2015.json');
var fs = require('fs');

var convertCoord = function(s){
  var coord = s.slice(1, -1).split(' ');
  coord[0] = coord[0].slice(0,-1);
  return {
    latitude: parseFloat(coord[0]),
    longitude: parseFloat(coord[1])
  };
}
console.log(crimes.length);
console.log(neighborhoodBoundaries.length);
var mappedCrimes = [];

for(var i = 0; i < 5; i++){
  console.log('Currently on index ', i);
  if(crimes[i].geolocation.indexOf('0.0,') !== -1) {
    // skip entries with reported locations of (0, 0)
    continue;
  }

  var crimeCoord = convertCoord(crimes[i].geolocation);
  for(var j = 0; j < neighborhoodBoundaries.length; j++){
    //console.log(geolib.isPointInside(crimeCoord, neighborhoodBoundaries[j].bounds))
    if(geolib.isPointInside(crimeCoord, neighborhoodBoundaries[j].bounds)){
      mappedCrimes.push({
        date: crimes[i].date,
        desc: crimes[i].crime_desc,
        geolocation: crimes[i].geolocation,
        area: neighborhoodBoundaries[i].name
      });
    }
  }

}

fs.writeFile('./mappedCrimes.json', JSON.stringify(mappedCrimes), function(err){
  if(err){
    throw err;
  }
  console.log('Finished conversion');
});
