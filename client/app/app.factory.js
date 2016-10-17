var factoryModule = angular.module('app.factory', []);

factoryModule.factory('mainFactory', function($http){
  //user OBJECT, stores our user.profile, user.results, everything
  var user = {};
  user.result = {};

  //uses GOOGLE GEOLOCATION api to grab addressData by address
  var startupGeoLocation = function(address) {
  	return $http({
  		method: 'GET',
  		url: 'api/geoLocation',
  		params: {newAddress: address}
	})
  }

  //uses info from startupGeoLocation and sets our user.newAddress
  var setUserDataFromGeoLocation = function(data) {
    if (data.address_components.length === 9) {
      user.result.newAddress = {
    		street: data.address_components[0].long_name + ' ' + data.address_components[1].long_name,
    		city: data.address_components[3].long_name,
    		state: data.address_components[5].long_name,
    		zip: data.address_components[7].long_name,
    		full: data.formatted_address,
    		neighborhood: data.address_components[2].long_name,
    		lat: data.geometry.location.lat,
    		lng: data.geometry.location.lng,
        latlng: data.geometry.location.lat + ',' + data.geometry.location.lng
    	}
    } else {
      user.result.newAddress = {
        street: data.address_components[0].long_name + ' ' + data.address_components[1].long_name,
        city: data.address_components[2].long_name,
        state: data.address_components[4].long_name,
        zip: data.address_components[6].long_name,
        full: data.formatted_address,
        neighborhood: data.address_components[2].long_name,
        lat: data.geometry.location.lat,
        lng: data.geometry.location.lng,
        latlng: data.geometry.location.lat + ',' + data.geometry.location.lng
    }
  }
    console.log(user, 'this is the user object in factory')
  }

  return {
  	startupGeoLocation : startupGeoLocation,
  	setUserDataFromGeoLocation : setUserDataFromGeoLocation
  }

});
