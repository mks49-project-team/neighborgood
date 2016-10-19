var results = angular.module('results', ['app.factory']);

results.controller('resultsController', function(mainFactory){
  var vm = this;

  vm.initMap = function() {
  	console.log('hi!')
  	vm.getMapData();
  }

  vm.getMapData = function() {
    var resPath = mainFactory.user.result;
  	var userCenter = {
  		lat: resPath.newAddress.lat,
  		lng: resPath.newAddress.lng
  	};

  	vm.map = new google.maps.Map(document.getElementById('map'), {
  		zoom: 14,
  		center: userCenter,
  		backgroundColor: 'pink',
  		scrollwheel: false
  	})

  	//universalMarkerMaker 2 params, type (store, restaurant) and data
  	var universalMarkerMaker = function(type) {

  		if (type === 'store') {
  			resPath.nearbyStores.forEach(
  				function(item){
            console.log(item, 'this is first item in stores')
  					var marker = new google.maps.Marker({
  						position: {lat : item.lat, lng : item.lng},
  						map: vm.map,
  						icon: item.icon,
              title: item.name
  					})
  				})
  		} else if (type === 'restaurant') {
  			resPath.nearbyRestaurants.forEach(
  				function(item){
            console.log(item, 'this is first item in restaurants')
  					var marker = new google.maps.Marker({
  						position: {lat : item.lat, lng : item.lng},
  						map: vm.map,
  						icon: item.icon
  					})
  				})
  		}
  	}
  	universalMarkerMaker('store')
  	universalMarkerMaker('restaurant')
  }
  console.log('inside resultsController');
});
