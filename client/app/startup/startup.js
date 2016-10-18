var startup = angular.module('startup', ['app.factory']);

startup.controller('startupController', function(mainFactory, $location){
  var vm = this;

  //startup - on submit, runs function to ping google GEOLOC api
  // and store data in our user.results object in factory.
  vm.newAddressPost = function() {
  	$location.path('options')
    mainFactory.startupGeoLocation(vm.newAddress)
  	.then(function(newAddressData) {
  		console.log(newAddressData.data[0], '******this is the address data in my factory**************')
  		mainFactory.setUserDataFromGeoLocation(newAddressData.data[0])
        console.log('mainFactory.user.newAddress:', mainFactory.user.result.newAddress)
  	})
  	.catch(function(err) {
  		console.log(err, 'error in startup / mainFactory.startupGeoLocation')
  	})
  };

});
