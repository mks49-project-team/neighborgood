var factoryModule = angular.module('app.factory', []);

factoryModule.factory('mainFactory', function($http){
  //user OBJECT, stores our user.profile, user.results, everything
  var user = {};
  user.result = {};
  user.result.priorities = {};
  user.result.neighborhoodResult = {};

  //uses GOOGLE GEOLOCATION api to grab addressData by address
  var startupGeoLocation = function(address) {
  	return $http({
  		method: 'GET',
  		url: 'api/geoLocation',
  		params: {
        newAddress: address
      }
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
  }

  //uses GOOGLE PLACES api to grab restaurant info by latlng
  var startupRestaurantLocation = function(latlng) {
    return $http({
      method: 'GET',
      url: 'api/restaurantLocation',
      params: {latlng: latlng}
    });
  }

  //sets the user object with user.result.nearbyRestaurants
  var setRestaurantData = function(data) {
    user.result.nearbyRestaurants = [];
    //console.log(data, 'this is data in set restaurants data ****')
    var photoChecker = function(x) {
      if (x.photos === undefined) {
        return 'N/A'
      } else {
        return x.photos[0].html_attributions[0]
      }
    };

    if (data.length > 5) {
          length = 5;
    } else {
      length = data.length;
    }

    for (var i = 0; i < length; i++) {
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
      });
    }
    user.result.numRestaurants = data.length;
  }

  //uses GOOGLE PLACES api to grab store info by latlng
  var startupStoreLocation = function(latlng) {
    return $http({
      method: 'GET',
      url: 'api/storeLocation',
      params: {latlng: latlng}
    });
  }

  //sets the user object with user.result.nearbyStores
  var setStoreData = function(data) {
    user.result.nearbyStores = [];
    var photoChecker = function(x) {
      var length;
      if (x.photos === undefined) {
        return 'N/A'
      } else {
        return x.photos[0].html_attributions[0]
      }
    };

    if (data.length > 5) {
      length = 5;
    } else {
      length = data.length;
    }

    for (var i = 0; i < length; i++) {
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
    user.result.numStores = data.length;
  }

  var getUserData = function() {
    return user;
  }

  var getDirectionsApi = function(originLat, originLng, destinationLat, destinationLng) {
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

  var insertPriorities = function(data) {
    user.result.priorities = data;
  }

  var getScore = function(userData) {
    return $http({
      method: "GET",
      url: "api/score",
      params: {
        userData: user.result
      }
    });
  }

  var setUserNeighborhoodResult = function(neighborhoodResult){
    user.result.neighborhoodResult = neighborhoodResult;
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
    insertPriorities : insertPriorities,
    getScore : getScore,
    setUserNeighborhoodResult : setUserNeighborhoodResult,
    user : user
  }
});

factoryModule.factory('userFactory', function($http, $window){
  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function(response){
      if(response.data.token){
        // successful signin
        $window.localStorage.token = response.data.token;
        $window.localStorage.user = user.username;
        // set authorization header
        $http.defaults.headers.common['Authorization'] = response.data.token;
        return true;
      } else {
        return false;
      }
    });
  }

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function(response){
      if(response.data !== "exists" && response.data.token) {
        $window.localStorage.token = response.data.token;
        $window.localStorage.user = user.username;
        $http.defaults.headers.common['Authorization'] = response.data.token;
      }
      return response;
    });
  }


  var signout = function(){
    delete $window.localStorage.token;
    delete $window.localStorage.user;
    $http.defaults.headers.common['Authorization'] = '';
  }

  var saveUserSearch = function(search) {
    return $http({
      method: 'POST',
      url: '/api/users/' + $window.localStorage.user + '/searches',
      data: {
        search: search
      }
    })
    .then(function(response){
      return response;
    });
  }

  var getUserSearches = function() {
    return $http({
      method: 'GET',
      url: '/api/users/' + $window.localStorage.user + '/searches',
    })
    .then(function(response){
      return response.data;
    });
  }

  var isUserLoggedIn = function(){
    return ($window.localStorage.user !== undefined) && ($window.localStorage.token !== undefined);
  }


  return {
    signin: signin,
    signup: signup,
    signout: signout,
    saveUserSearch: saveUserSearch,
    getUserSearches: getUserSearches,
    isUserLoggedIn: isUserLoggedIn
  }
});
