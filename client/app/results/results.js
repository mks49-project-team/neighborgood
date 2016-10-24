var results = angular.module('results', ['app.factory']);

results.controller('resultsController', function(mainFactory, userFactory, $window, $location){
  var vm = this;
  vm.saved = false;
  vm.initMap = function() {
  	vm.getMapData();
  }

  vm.saveSearch = function() {
    if ($window.localStorage.getItem('token') !== null) {
      userFactory.saveUserSearch(mainFactory.user.result)
        .then(function(response){
          if(response.status === 200){
            vm.saved = true;
            mainFactory.user.result = {};
            $location.path('savedSearches');
          }
        });
    }
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
    var homeinfo = new google.maps.InfoWindow({
      content: '<h1> ' + resPath.newAddress.full + '</hi>'
    });

      if (resPath.destinationAddress !== undefined) {
        var commute = new google.maps.Marker({
          position: {lat : resPath.destinationAddress.lat, lng : resPath.destinationAddress.lng},
          map: vm.map,
          icon: {url:'http://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png', scaledSize: new google.maps.Size(30,30)},
          title: 'Commute Destination'
        })
        var commuteinfo = new google.maps.InfoWindow({
            content: '<h1> ' + resPath.destinationAddress.full + '</hi>'
          });
        google.maps.event.addListener(commute, 'click', function() {
        commuteinfo.open(vm.map, commute)
      })
      }
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

      var infowindowCreator = function(message) {
        return new google.maps.InfoWindow({
          content: message
        });
      };

      var ratingStringGenerator = function(num) {
        if (num === undefined) {return ' price rating is not listed '}
        var rating = ['free', '$', '$$', '$$$', '$$$$'];
        return rating[num]
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
            var msg = '<div id="content">' +
                      '<h1>' + item.name + '</h1>' +
                      '<div id="bodyContent">' + item.name + ' is located walking distance (less than 15 min) from you! It\'s <strong>'+ ratingStringGenerator(item.priceLevel) + '</strong> and has an overall rating of ' + item.rating + ' .' +
                      '</div> </div>'
            var infowindow = infowindowCreator(msg)
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(vm.map, marker)
            });
  				});
  		} else if (type === 'restaurant') {
  			resPath.nearbyRestaurants.forEach(
  				function(item){
            var holder = item.icon
            var iconPlace = iconMaker(holder);
  					var marker = new google.maps.Marker({
  						position: {lat : item.lat, lng : item.lng},
  						map: vm.map,
  						icon: iconPlace,
              title: item.name
  					});
            var msg = '<div id="content">' +
                      '<h1>' + item.name + '</h1>' +
                      '<div id="bodyContent">' + item.name + ' is located walking distance (less than 15 min) from you! It\'s <strong>' + ratingStringGenerator(item.priceLevel) + '</strong> and has an overall rating of ' + item.rating + ' .' +
                      '</div> </div>'
            var infowindow = infowindowCreator(msg);
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(vm.map, marker)
            });
  				});
  		}

  	}

    google.maps.event.addListener(home, 'click', function() {
      homeinfo.open(vm.map, home);
    });
  	universalMarkerMaker('store');
  	universalMarkerMaker('restaurant');
  }
  vm.initMap();

  vm.isUserLoggedIn = userFactory.isUserLoggedIn();
});
