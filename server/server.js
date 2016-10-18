var express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var router = require('./routes.js');

var app = express();

app.set('port', process.env.PORT || 8008);

//register middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client'));
app.use('/api', router.router);


app.listen(app.get('port'), function(){
  console.log('Listening on port ', app.get('port'));
});
