var startup = angular.module('startup', ['app.factory']);

startup.controller('startupController', function(mainFactory){
  var vm = this;

  //startup - on submit, runs function to ping google GEOLOC api
  // and store data in our user.results object in factory.
  vm.newAddressPost = function() {
  	return mainFactory.startupGeoLocation(vm.newAddress)
  	.then(function(newAddressData) {
  		console.log(newAddressData.data[0], '******this is the address data in my factory**************')
  		return mainFactory.setUserDataFromGeoLocation(newAddressData.data[0])
  	})
  	.catch(function(err) {
  		console.log(err, 'error in startup / mainFactory.startupGeoLocation')
  	})
  };

});
