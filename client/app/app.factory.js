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
    // only the function name and user.result.destinationAddress changed from the original code above
  var secondUserData = function(data) {
    if (data.address_components.length === 9) {
      user.result.destinationAddress = {
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
      user.result.destinationAddress = {
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

  var getUserData = function() {
    return user;
  }

  var getDirectionsApi = function(originLat, originLng, destinationLat, destinationLng) {
    // all parameters are getting passed succesfully, jeff @ 2:34pm oct 18
    console.log('inside getDirectionsApi in app.factory, were the parameters successfully passed in?:', originLat, originLng, destinationLat, destinationLng)
    return $http({
      method: "GET",
      url: "api/directions",
      params: {
        originLat: originLat,
        originLng: originLng,
        destinationLat: destinationLat,
        destinationLng: destinationLng
      }
    })
  }

  var insertDirectionsData = function(data) {

    user.result.commute = {
      distance : {
        text : data.distance.text,
        value : data.distance.value
      },

      duration : {
        text : data.duration.text,
        value : data.duration.value
      },

      durationInTraffic : {
        text : data.duration_in_traffic.text,
        value : data.duration_in_traffic.value
      }
  }

    console.log('user.result.distance.text:', user.result.distance.text)
    console.log('the entire user.result object:', user.result)
  }

  return {
    startupGeoLocation : startupGeoLocation,
    setUserDataFromGeoLocation : setUserDataFromGeoLocation,
    secondUserData : secondUserData,
    getUserData : getUserData,
    getDirectionsApi : getDirectionsApi,
    insertDirectionsData : insertDirectionsData,
    user : user // for console.logs


  }
});
