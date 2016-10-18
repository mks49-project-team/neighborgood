// This script converts crime data from csv to a json array
// To run, npm install csvtojson, and then run node convertCrimeData.js

var request = require('request');
var fs = require('fs');

var Converter=require("csvtojson").Converter;
var csvConverter=new Converter({constructResult:false, toArrayString: true, headers:["*omit*date_rptd","*omit*dr_no","date","*omit*time_occ","*omit*area.no","area","*omit*area.rd","crime_cd","crime_desc","*omit*status","*omit*status_desc","*omit*location","*omit*cross_street","geolocation"]});
var readStream=fs.createReadStream("./Crimes_2012-2015.csv");

var writeStream=fs.createWriteStream("crimeDataLA-2015.json");

readStream.pipe(csvConverter).pipe(writeStream);
csvConverter.on("end_parsed",function(jsonObj){
    console.log("done");
});
