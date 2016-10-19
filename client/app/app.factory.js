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


  //uses GOOGLE PLACES api to grab restaurant info by latlng
  var startupRestaurantLocation = function(latlng) {
    console.log(latlng, 'this is latlng')
    return $http({
      method: 'GET',
      url: 'api/restaurantLocation',
      params: {latlng: latlng}
    })
  }

  //sets the user object with user.result.nearbyRestaurants
  var setRestaurantData = function(data) {
    user.result.nearbyRestaurants = [];
    //console.log(data, 'this is data in set restaurants data ****')
    var photoChecker = function(x) {
          if (x.photos === undefined) {
            return 'N/A'
          } else {return x.photos[0].html_attributions[0]}
        };

    for (var i = 0; i < 5; i++) {
      var photo = photoChecker(data[i]);
      user.result.nearbyRestaurants.push({
        icon : 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
        name : data[i].name,
        photo : photo,
        priceLevel : data[i].price_level,
        rating : data[i].rating,
        lat : data[i].geometry.location.lat,
        lng : data[i].geometry.location.lng,
        latlng : data[i].geometry.location.lat + ',' + data[i].geometry.location.lng,
        placeId: data[i].place_id
      })
    }
    //console.log(user.result.nearbyRestaurants, 'these are the nearby restaruants')
  }

  //uses GOOGLE PLACES api to grab store info by latlng
  var startupStoreLocation = function(latlng) {
    //console.log(latlng, 'this is latlng')
    return $http({
      method: 'GET',
      url: 'api/storeLocation',
      params: {latlng: latlng}
    })
  }

  //sets the user object with user.result.nearbyStores
  var setStoreData = function(data) {
    user.result.nearbyStores = [];
    //console.log(data, 'this is data in set restaurants data ****')
    var photoChecker = function(x) {
          if (x.photos === undefined) {
            return 'N/A'
          } else {return x.photos[0].html_attributions[0]}
        };

    for (var i = 0; i < 5; i++) {
      var photo = photoChecker(data[i]);
      user.result.nearbyStores.push({
        icon : 'https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png',
        name : data[i].name,
        photo : photo,
        priceLevel : data[i].price_level,
        rating : data[i].rating,
        lat : data[i].geometry.location.lat,
        lng : data[i].geometry.location.lng,
        latlng : data[i].geometry.location.lat + ',' + data[i].geometry.location.lng,
        placeId: data[i].place_id
      })
    }
    //console.log(user.result.nearbyStores, 'these are the nearby stores')
    console.log(user, 'this is the user object')
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
    });
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
  }

  return {
    startupGeoLocation : startupGeoLocation,
    setUserDataFromGeoLocation : setUserDataFromGeoLocation,
    secondUserData : secondUserData,
    getUserData : getUserData,
    getDirectionsApi : getDirectionsApi,
    insertDirectionsData : insertDirectionsData,
    startupRestaurantLocation : startupRestaurantLocation,
    setRestaurantData : setRestaurantData,
    startupStoreLocation : startupStoreLocation,
    setStoreData : setStoreData,
    user : user // for console.logs
  }
});
