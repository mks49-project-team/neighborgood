var startup = angular.module('startup', ['app.factory']);

startup.controller('startupController', function(mainFactory, $location, userFactory){
  var vm = this;

  vm.autocomplete = function() {
    vm.defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(34.0522, -118.2437));
    vm.input = document.getElementById('autocomplete');
    vm.options = {bounds: vm.defaultBounds};
    vm.autocomplete = new google.maps.places.Autocomplete(vm.input, vm.options);
  }

  //startup - on submit, runs function to ping google GEOLOC api
  // and store data in our user.results object in factory.
  vm.newAddressPost = function() {
    $location.path('options');
  	return mainFactory.startupGeoLocation(vm.newAddress)
  	 .then(function(newAddressData) {
  	    mainFactory.setUserDataFromGeoLocation(newAddressData.data[0])
  		  vm.getRestaurants();
  		  vm.getStores();
  	  })
  	  .catch(function(err) {
  		  console.log(err, 'error in startup / mainFactory.startupGeoLocation');
  	  });
    };
  //startup - on submit, runs function to ping google PLACES api
  // and store data in our user.results.nearbyRestaurants object in factory.
  vm.getRestaurants = function() {
  	return mainFactory.startupRestaurantLocation(mainFactory.user.result.newAddress.latlng)
  	.then(function(restaurants) {
  	   return mainFactory.setRestaurantData(restaurants.data.results);
  	});
  };
  //startup - on submit, runs function to ping google PLACES api
  // and store data in our user.results.nearbyStores object in factory.
  vm.getStores = function() {
  	return mainFactory.startupStoreLocation(mainFactory.user.result.newAddress.latlng)
  	.then(function(stores) {
  		return mainFactory.setStoreData(stores.data.results);
  	});
  };

});
