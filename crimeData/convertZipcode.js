// This script converts crime data from csv to a json array
// To run, npm install csvtojson, and then run node convertZipcode.js

var request = require('request');
var fs = require('fs');

var Converter=require("csvtojson").Converter;
var csvConverter=new Converter({constructResult:false, toArrayString: true, headers:["geoId","*omit*",	"*omit*",	"*omit*",	"*omit*","lat","lng"]});
var readStream=fs.createReadStream("./US_zipcodes.csv");

var writeStream=fs.createWriteStream("zipcodesCA.json");

readStream.pipe(csvConverter).pipe(writeStream);
csvConverter.on("end_parsed",function(jsonObj){
    console.log("done");
});
