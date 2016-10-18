var results = angular.module('results', ['app.factory']);

results.controller('resultsController', function(mainFactory){
  var vm = this;

  window.initMap = function() {
  	console.log('hi!')
  	//vm.getMapData();
  }

  vm.getMapData = function() {
    var resPath = mainFactory.user.result;
  	var userCenter = {
  		lat: resPath.newAddress.lat,
  		lng: resPath.newAddress.lng
  	};

  	var map = new google.maps.Map(document.getElementById('map'), {
  		zoom: 4,
  		center: userCenter
  		//backgroundColor: 'pink',
  		//scrollwheel: false
  	})

  	//universalMarkerMaker 2 params, type (store, restaurant) and data
  	var universalMarkerMaker = function(type) {
  		var storeCenter = {
  		lat: resPath.nearbyStores.lat,
  		lng: resPath.nearbyStores.lng
  		}
  			/// DID NOT SET UP THE NEARBY STUFF RIGHT, THERE SHOULD BE A [] ARRAY
  		var restaurantCenter = {
  		lat: resPath.nearbyRestaurants.lat,
  		lng: resPath.nearbyRestaurants.lng
  		}

  		if (type === 'store') {
  			resPath.nearbyStores.forEach(
  				function(item){
  					var marker = new google.maps.Marker({
  						position: storeCenter,
  						map: map,
  						icon: resPath.nearbyStores.icon
  					})
  				})
  		} else if (type === 'restaurant') {
  			resPath.nearbyRestaurants.forEach(
  				function(item){
  					var marker = new google.maps.Marker({
  						position: restaurantCenter,
  						map: map,
  						icon: resPath.nearbyRestaurants.icon
  					})
  				})
  		}
  	}
  	universalMarkerMaker('store')
  	universalMarkerMaker('restaurant')
  }
  console.log('inside resultsController');
});
