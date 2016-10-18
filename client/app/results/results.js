var results = angular.module('results', ['app.factory']);

results.controller('resultsController', function(mainFactory){
  var vm = this;

  var mapinit= function() {
  	console.log('hi!')
  	vm.getMapData();
  }

  var getMapData = function() {
  	var userCenter = {
  		lat: mainFactory.user.result.newAddress.lat,
  		lng: mainFactory.user.result.newAddress.lng
  	};

  	var map = new google.maps.Map(document.getElementById('map'), {
  		zoom: 4,
  		center: userCenter,
  		backgroundColor: 'pink',
  		scrollwheel: false
  	})

  	//universalMarkerMaker 2 params, type (store, restaurant) and data
  	var universalMarkerMaker = function(type) {
  		var storeCenter = {
  		lat: mainFactory.user.result.nearbyStores.lat,
  		lng: mainFactory.user.result.nearbyStores.lng
  		}
  			/// DID NOT SET UP THE NEARBY STUFF RIGHT, THERE SHOULD BE A [] ARRAY
  		var restaurantCenter = {
  		lat: mainFactory.user.result.nearbyRestaurants.lat,
  		lng: mainFactory.user.result.nearbyRestaurants.lng
  		}

  		if (type === 'store') {
  			mainFactory.user.result.nearbyStores.forEach(
  				function(item){
  					var marker = new google.maps.Marker({
  						position: storeCenter,
  						map: map,
  						icon: mainFactory.user.result.nearbyStores.icon
  					})
  				})
  		} else if (type === 'restaurant') {
  			mainFactory.user.result.nearbyRestaurants.forEach(
  				function(item){
  					var marker = new google.maps.Marker({
  						position: restaurantCenter,
  						map: map,
  						icon: mainFactory.user.result.nearbyRestaurants.icon
  					})
  				})
  		}
  	}
  	//universalMarkerMaker('store')
  	//universalMarkerMaker('restaurant')
  }
  console.log('inside resultsController');
});
