var savedSearches = angular.module('savedSearches', ['app.factory']);

savedSearches.controller('savedSearchesController', function(userFactory, mainFactory){
  var vm = this;



/////////  BELOW IS SERGY WORKING... :)


  // array of all different destinations for amount of map renders
  // vm.maps = [];

  // var ExampleDATA = [{destination : { lat : 33.874049, lng : -118.053145}, address : {lat : 34.0192691, lng : -118.4943443},    score : 88, graph : 'image', }]

  // vm.initMaps = function() {
  // 	console.log('init map searches')
  // 	vm.grabDestinations();
  // 	vm.renderSavedMaps();
  // }

  // //grabs all destinations available, ul list, then click on them to run maker function
  // vm.grabDestinations = function() {
  // 	ExampleDATA.forEach(function(item) {
  // 		if (item.destination) {
  // 			if (vm.maps.indexOf(item.destination.latlng) === -1) {
  // 				vm.maps.push(item);
  // 			}
  // 		}
  // 	})
  // 	if (vm.maps.length > 0) {
  // 		vm.renderMap(vm.maps[0])
  // 	} else if (vm.maps.length === 0) {
  // 		vm.renderMap(ExampleDATA.newAddress.lnglat)
  // 	}
  // 	return vm.maps;
  // }

  // //render map object with address.lat and lng passed in
  // vm.renderMap = function(address) {
  // 	var mapSave = new google.maps.Map(document.getElementById('map'), {
  // 		zoom: 14,
  // 		center: {
  // 			lat: address.lat,
  // 			lng: address.lng
  // 		},
  // 		backgroundColor: 'pink',
  // 		scrollwheel: false
  // 	})
  // };

  // vm.renderSavedMaps = function(selectionUser) {

  // 	var item = selectionUser || 0;
  // 	// if there are addresses destination that were entered
  // 	if (vm.maps.length > 0) {
  // 		//create markers, map and everything in here???
  // 		eXampleData.forEach(function(obj) {
  // 			if (vm.maps[item].destination.latlng === obj[i].destination.latlng) {
  // 				vm.renderMarker(obj);
  // 			}
  // 		})
  // 		// vm.maps.forEach(function(obj){
  // 		// 	for (var i = 0; i < ExampleDATA.results; i++) {
  // 		// 		if (ExampleDATA.destination.latlng === obj[i].destination.latlng) {

  // 		// 			// vm.renderMap(address);
  // 		// 			// vm.renderMarker(ExampleDATA.destination)
  // 		// 		}
  // 		// 	}
  // 		// })

  // 	} //if there ARE NO ADDRESSES to desitnations,
  // 	else {
  // 		eXampleData.forEach(function(obj) {
  // 			if (!obj[i].destination) {
  // 				vm.renderMarker(obj);
  // 			}
  // 		})
  // 	}

  // }
  // //user clicks on item in unorderedlist and runs:
  // vm.renderMarker = function(obj) {
  // 	var markerSave = new google.maps.Marker({
  // 		position: {
  // 			lat: obj.dstination.lat,
  // 			lng: obj.dstination.lng
  // 		},
  // 		map: mapSave,
  // 		title: obj.title
  // 	})
  // 	var msgSave = '<div id="content">' +
  // 				  '<h1>' + obj.score + '</h1>' +
  // 				  '<div>' + obj.graph + '</div>' +
  // 				  '</div>';
  // 	var infowindowSave = new google.maps.InfoWindow({
  // 		content: msgSave
  // 	})
  // 	google.maps.event.addListener(markerSave, 'click', function() {

  //               infowindowSave.open(mapSave, markerSave)


  //       })
  // }





  vm.trial = function() {

  userFactory.getUserSearches()
    .then(function(results){
      vm.x = results;
      console.log(vm.x)
    })
  //console.log(typeof vm.x);
  }
  vm.trial();

});
