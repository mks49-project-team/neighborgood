var options = angular.module('options', ['app.factory']);
//
// mainFactory is being injected from app.factory.js
startup.controller('optionsController', function(mainFactory){
  var vm = this;
  console.log('inside optionsController');

  vm.getCommute = function(secondaryAddress) {
    mainFactory.getCommute(secondaryAddress)
    .then

  }




});
