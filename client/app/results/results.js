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

    var home = new google.maps.Marker({
      position: userCenter,
      map: vm.map,
      animation: google.maps.Animation.DROP,
      icon: {url:'http://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png', scaledSize: new google.maps.Size(30,30)},
      title: 'YOUR NEW HOUSE!'
    })

      home.setAnimation(google.maps.Animation.BOUNCE);

      // function toggleBounce() {
      //   if (home.getAnimation() !== null) {
      //     home.setAnimation(null);
      //   } else {
      //     home.setAnimation(google.maps.Animation.BOUNCE);
      //   }
      // }




  	//universalMarkerMaker 2 params, type (store, restaurant) and data
  	var universalMarkerMaker = function(type) {
      var iconMaker = function (icon) {
        var ans = {
          url: icon,
          // size: new google.maps.Size(50, 50),
          // origin: new google.maps.Point(0, 0),
          // anchor: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(30, 30)
         };
         return ans;
      };

  		if (type === 'store') {
  			resPath.nearbyStores.forEach(
  				function(item){
            var holder = item.icon
            var iconPlace = iconMaker(holder);
  					var marker = new google.maps.Marker({
  						position: {lat : item.lat, lng : item.lng},
  						map: vm.map,
  						icon: iconPlace,
              title: item.name
  					})
  				})
  		} else if (type === 'restaurant') {
  			resPath.nearbyRestaurants.forEach(
  				function(item){
            var holder = item.icon
            var iconPlace = iconMaker(holder);
            console.log(iconPlace, 'this is first item in restaurants')
  					var marker = new google.maps.Marker({
  						position: {lat : item.lat, lng : item.lng},
  						map: vm.map,
  						icon: iconPlace
  					})
  				})
  		}
  	}
  	universalMarkerMaker('store')
  	universalMarkerMaker('restaurant')
  }
  console.log('inside resultsController');
});
