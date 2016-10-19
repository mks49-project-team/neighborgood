// This script converts crime data from csv to a json array
// run node convertCrimeData.js

var request = require('request');
var fs = require('fs');

var Converter=require("csvtojson").Converter;
var csvConverter=new Converter({constructResult:false, toArrayString: true, headers:["*omit*date_rptd","*omit*dr_no","date","*omit*time_occ","*omit*area.no","area","*omit*area.rd","crime_cd","crime_desc","*omit*status","*omit*status_desc","*omit*location","*omit*cross_street","geolocation"]});
var readStream=fs.createReadStream("./Crimes_2012-2015.csv");

var writeStream=fs.createWriteStream("crimeDataLA-2015.json");

readStream.pipe(csvConverter).pipe(writeStream);
csvConverter.on("end_parsed",function(jsonObj){
    console.log("finished converting crime data");
});

// Convert neighborhood geojson file to json with coordinates in format requested for geolib module
// Geojson obtained from  http://boundaries.latimes.com/set/la-county-neighborhoods-v6/
// var neighborhoods = require('./la-county-neighborhoods-v6.geojson').features;
//
// var neighborhoodBoundaries = neighborhoods.map(function(neighborhood){
//   return {
//     name: neighborhood.properties.name.toLowerCase(),
//     bounds: neighborhood.geometry.coordinates[0][0]
//       .map(function(coord){
//         return {latitude: coord[0], longitude: coord[1]};
//       })
//   }
// });
//
// fs.writeFile('./neighborhoodBoundaries.json', JSON.stringify(neighborhoodBoundaries), function(err){
//   if(err) {throw err;}
//   console.log('finished converting neighborhood data');
// });
