var options = angular.module('options', ['app.factory']);
//
// mainFactory is being injected from app.factory.js
options.controller('optionsController', function(mainFactory){
  var vm = this;
  console.log('inside optionsController');

  vm.optionsGeoLocation = function() {
    mainFactory.startupGeoLocation(vm.secondAddress)
     .then(function(response) {
      console.log('this is optionsControllers response.data:', response.data)
      mainFactory.secondUserData(response.data[0])
      vm.getUserData();
    })
      .catch(function(err) {
        console.log('err in startup.controller, optionsGeoLocation:', err)
      })
  }

  //user.result.newAddress.lat
  //user.result.newAddress.lng
  //user.result.destinationAddress.lat
  //user.result.destinationAddress.lng

  vm.getUserData = function() {
    vm.user = mainFactory.getUserData()
    // vm.originLat = vm.user.result.newAddress.lat
    // vm.originLng = vm.user.result.newAddress.lng
    vm.destinationLat = vm.user.result.destinationAddress.lat
    vm.destinationLng = vm.user.result.destinationAddress.lng

    // mainFactory.getDirectionsApi = function(vm.originLat, vm.originLng, vm.destinationLat, vm.destinationLng) {

    // }

  }





});
