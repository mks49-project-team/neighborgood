var startup = angular.module('startup', ['app.factory']);

startup.controller('startupController', function(mainFactory){
  var vm = this;

  //startup - on submit, runs function to ping google GEOLOC api
  // and store data in our user.results object in factory.
  vm.newAddressPost = function() {
  	return mainFactory.startupGeoLocation(vm.newAddress)
  	.then(function(newAddressData) {
  		console.log(newAddressData.data[0], '******this is the address data in my factory**************')
  		mainFactory.setUserDataFromGeoLocation(newAddressData.data[0])
  		vm.getRestaurants();
  		vm.getStores();
  	})
  	.catch(function(err) {
  		console.log(err, 'error in startup / mainFactory.startupGeoLocation')
  	})
  };
  //startup - on submit, runs function to ping google PLACES api
  // and store data in our user.results.nearbyRestaurants object in factory.
  vm.getRestaurants = function() {
  	return mainFactory.startupRestaurantLocation(mainFactory.user.result.newAddress.latlng)
  	.then(function(restaurants) {
  		console.log(restaurants.data.results, 'this is data from get restaurants')
  		return mainFactory.setRestaurantData(restaurants.data.results);
  	})
  };
  //startup - on submit, runs function to ping google PLACES api
  // and store data in our user.results.nearbyStores object in factory.
  vm.getStores = function() {
  	return mainFactory.startupStoreLocation(mainFactory.user.result.newAddress.latlng)
  	.then(function(stores) {
  		console.log(stores.data.results, 'this is data from get stores')
  		return mainFactory.setStoreData(stores.data.results);
  	})
  };

});


