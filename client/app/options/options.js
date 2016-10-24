var options = angular.module('options', ['app.factory']);

options.controller('optionsController', function(mainFactory, $location){

  var vm = this;

  vm.priorities = {
    safety: 0,
    commute: 0,
    walkability: 0
  };

  vm.autocomplete;

  vm.autocomplete = function() {
    vm.defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(34.0522, -118.2437));
    vm.input = document.getElementById('autocomplete');
    vm.options = {bounds: vm.defaultBounds};
    vm.autocomplete = new google.maps.places.Autocomplete(vm.input, vm.options);
  }

  vm.optionsGeoLocation = function() {
    if (vm.secondAddress) {
      mainFactory.startupGeoLocation(vm.secondAddress)
        .then(function(response) {
          mainFactory.secondUserData(response.data[0]);
          vm.getUserData();
        });
    } else {
      mainFactory.insertPriorities(vm.priorities);
        mainFactory.getScore()
          .then(function(response){
            mainFactory.setUserNeighborhoodResult(response.data);
            $location.path('results');
          })
          .catch(function(err){
            console.log('error getting scores: ', err);
          });
    }
  }

  vm.getUserData = function() {
    vm.user = mainFactory.getUserData();
    vm.originLat = vm.user.result.newAddress.lat;
    vm.originLng = vm.user.result.newAddress.lng;
    vm.destinationLat = vm.user.result.destinationAddress.lat;
    vm.destinationLng = vm.user.result.destinationAddress.lng;

    vm.getDirectionsApi();
  }

  vm.getDirectionsApi = function () {
    mainFactory.getDirectionsApi(vm.originLat, vm.originLng, vm.destinationLat, vm.destinationLng)
      .then(function(response) {
        mainFactory.insertDirectionsData(response.data.routes[0].legs[0]);
        mainFactory.insertPriorities(vm.priorities);
        mainFactory.getScore()
          .then(function(response){
            mainFactory.setUserNeighborhoodResult(response.data);
            $location.path('results');
          })
          .catch(function(err){
            console.log('error getting scores: ', err);
          });
      })
      .catch(function(err) {
        console.log('err in getUserData in startupController:', err)
      });
  }
});
