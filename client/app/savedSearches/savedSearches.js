var savedSearches = angular.module('savedSearches', ['app.factory']);

savedSearches.controller('savedSearchesController', function(userFactory, mainFactory){
  var vm = this;
  vm.savedResults;
  vm.maps = [[]];
  vm.mapsName = [[]];
  vm.markerResults;
  vm.populateList = false;

  vm.grabUserSearches = function() {
    userFactory.getUserSearches()
      .then(function(results){
        vm.savedResults = results;
        vm.initMaps();
      });
  };

  vm.grabUserSearches();

  vm.initMaps = function() {
    vm.arrangeDest();
    if (vm.maps[0].length > 0) {
      vm.renderSavedMaps(0);
    } else if (vm.maps.length > 1) {
      vm.renderSavedMaps(1);
    } else {
      console.log('please make new Search');
    }
  };

  //fills vm.maps array with lat.lng string from each destination address, if none then makes it first address
  vm.arrangeDest = function() {
    vm.savedResults.forEach(function(result) {
      if (result.destinationAddress !== undefined) {
        if (vm.maps.indexOf(result.destinationAddress.latlng) === -1) {
          vm.maps.push(result.destinationAddress.latlng)
          vm.mapsName.push(result)
        }
      } else if (result.destinationAddress === undefined) {
        if (vm.maps[0].indexOf(result.newAddress.latlng) === -1 ) {
          vm.maps[0].push(result.newAddress.latlng);
          vm.mapsName[0].push(result);
        }
      }
    });
    vm.populateList = true;
  };

  //render map object with address.lat and lng passed in
  vm.renderMap = function(address) {
    var lat;
    var lng;
    //grabs lat and lng from address string
    var latlngFromAddress = function(string) {
      var seperator = string.indexOf(',');
      lat = string.slice(0,seperator);
      lng = string.slice(seperator + 1);
      return;
    };

    latlngFromAddress(address);

    var latlng = new google.maps.LatLng(lat, lng);

    vm.mapSave = new google.maps.Map(document.getElementById('mapSave'), {
      zoom: 14,
      center : latlng,
      backgroundColor: 'pink',
      scrollwheel: false
    });

    vm.renderMarker({
      lat: lat,
      lng: lng
    });
  };

  vm.renderSavedMaps = function(selectionUser) {
    var item = selectionUser;
    //clears out older markers selected
    vm.markerResults = [];
    if (item === 0) {
      if (vm.maps[0].length > 0) {
        vm.renderMap(vm.maps[0][0]);
        vm.savedResults.forEach(function(obj) {
          if (vm.maps[0].indexOf(obj.newAddress.latlng) !== -1) {
            vm.renderMarker(obj.newAddress, obj);
            vm.markerResults.push(obj);
          }
        });
      } else {
        console.log('please make new Search');
      }
     } else {
        vm.renderMap(vm.maps[item]);
        vm.savedResults.forEach(function(obj) {
          if (!!obj.destinationAddress) {
            if (vm.maps.indexOf(obj.destinationAddress.latlng) !== -1) {
              if (obj.destinationAddress.latlng === vm.maps[item]) {
                vm.renderMarker(obj.destinationAddress);
                vm.renderMarker(obj.newAddress, obj);
                vm.markerResults.push(obj);
              }
            }
          }
        });
    }
  }

  vm.transferToResults = function(info) {
    mainFactory.user.result = info;
    $location.path('results');
  }
  //user clicks on item in unorderedlist and runs:
  vm.renderMarker = function(obj, info) {
    var lats = Number(obj.lat);
    var lngs = Number(obj.lng);
    var msgSave;
    var latlngs = new google.maps.LatLng(lats, lngs);
    var markerSave = new google.maps.Marker({
      position: latlngs,
      map: vm.mapSave,
      title: obj.full
    })
    var msgSaveMaker = function() {
      if (info) {
           msgSave = '<div id="content" ng-click="vm.transferToResults(info)">' +
           '<h5> score </h5>' +
           '<h5>' + info.neighborhoodResult.total + '</h5>' +
           '<p>' + obj.street + '</p>' +
           '</div>';
      } else {
        msgSave = '<div id="content">' +
           '<p>' + obj.full + '</p>' +
           '</div>';
      }
    }
    msgSaveMaker();

    var infowindowSave = new google.maps.InfoWindow({
      content: msgSave
    });

    google.maps.event.addListener(markerSave, 'click', function() {
      infowindowSave.open(vm.mapSave, markerSave)
    });

    infowindowSave.open(vm.mapSave, markerSave);
  };

});
