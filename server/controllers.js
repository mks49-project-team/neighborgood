var request = require('request');

var controller = {
  getCrime: function(req, res){

    var options = {
      method: 'GET',
      url: 'https://data.lacity.org/resource/y9pe-qdrd.json',
      data: {
        '$$app_token': process.env.CRIME_APP_TOKEN
      }
    }
    request(options, function(err, response, body){
      if(err){
        console.log('error getting crime data: ', err);
      }
      res.send(body);
    });
  }
}



module.exports = {
  controller: controller
}
