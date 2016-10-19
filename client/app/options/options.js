var options = angular.module('options', ['app.factory']);

// mainFactory is being injected from app.factory.js
options.controller('optionsController', function(mainFactory){

  var vm = this;
  vm.options = {
    crime: true,
    traffic: true,
    walkability: true
  };

  vm.optionsGeoLocation = function() {
    mainFactory.startupGeoLocation(vm.secondAddress)
     .then(function(response) {
      console.log('this is optionsControllers response.data:', response.data)
      mainFactory.secondUserData(response.data[0])
      console.log('this is below mainFactory.secondUserData:', response.data[0])
      console.log('is this the user object?:', mainFactory.user)
      vm.getUserData();
    })
      .catch(function(err) {
        console.log('err in options.controller, optionsGeoLocation:', err)
      })
  },

  vm.getUserData = function() {
    vm.user = mainFactory.getUserData();
    vm.originLat = vm.user.result.newAddress.lat;
    vm.originLng = vm.user.result.newAddress.lng;
    vm.destinationLat = vm.user.result.destinationAddress.lat;
    vm.destinationLng = vm.user.result.destinationAddress.lng;
    // all data is getting passed successfully, jeff @ 2:17pm oct 18
    console.log('originLat in getUserData:', vm.originLat)
    console.log('originLng:', vm.originLng)
    console.log('destinationLat:', vm.destinationLat)
    console.log('destinationLng:', vm.destinationLng)

    vm.getDirectionsApi();

  }
  vm.getDirectionsApi = function () {

    mainFactory.getDirectionsApi(vm.originLat, vm.originLng, vm.destinationLat, vm.destinationLng)
    // console.log('this is vm.getDirectionsApi, checking the response after invoking the function', response)
      .then(function(response) {
        vm.insertDirectionsData(response.data.routes[0].legs[0]);
        // console.log('response inside getUserData:', response.data.routes[0].legs[0])
        // console.log('distance:', response.data.routes[0].legs[0].distance)
        // console.log('duration:', response.data.routes[0].legs[0].duration)
        // console.log('duration in traffic:', response.data.routes[0].legs[0].duration_in_traffic)

      })

    .catch(function(err) {
      console.log('err in getUserData in startupController:', err)
    })
}

  vm.insertDirectionsData = function(data) {
    console.log("JEFF YOOOO:", data)
    mainFactory.insertDirectionsData(data)
  }




});
