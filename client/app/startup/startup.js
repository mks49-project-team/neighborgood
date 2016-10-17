var startup = angular.module('startup', ['app.factory']);

startup.controller('startupController', function(){
  var vm = this;
  console.log('inside startupController');
});
