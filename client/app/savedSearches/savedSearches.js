var savedSearches = angular.module('savedSearches', ['app.factory']);

savedSearches.controller('savedSearchesController', function(userFactory, mainFactory){
  var vm = this;
  vm.savedResults;
  vm.maps = [[]];
  vm.mapsName = [[]];
  vm.markerResults;

  vm.grabUserSearches = function() {
    userFactory.getUserSearches()
      .then(function(results){
        vm.savedResults = results;
        console.log(vm.savedResults) //array of objects! 
      })
    //console.log(typeof vm.x);
  }

  vm.grabUserSearches();

  vm.initMaps = function() {
    console.log('init map id=searches')
    vm.arrangeDest();
    vm.renderSavedMaps(0);
  }

  vm.arrangeDest = function() {

    //fills vm.maps array with lat.lng string from each destination address, if none then makes it first address
    vm.savedResults.forEach(function(result) {
      console.log(result, "***** this is result object****")
      //console.log(result.destinationAddress, 'destination address for each res in arrDest; made it')
      if (result.destinationAddress !== undefined) {
        //console.log('made it into defined, aka pushed')
        if (vm.maps.indexOf(result.destinationAddress.latlng) === -1) {
          vm.maps.push(result.destinationAddress.latlng)
          vm.mapsName.push(result)
        } //maybe have to use null instead of undefined?
      } else if (result.destinationAddress === undefined) {
        //console.log('made it into undefined, aka pushed to maps array')
        if (vm.maps[0].indexOf(result.newAddress.latlng) === -1 ) {
          vm.maps[0].push(result.newAddress.latlng)
          vm.mapsName[0].push(result)

        }
      }

    });
    console.log(vm.maps,'this is vm maps')
    console.log(vm.mapsName, 'this is the mapsName object')
    

  }

  //render map object with address.lat and lng passed in
  vm.renderMap = function(address) {
    var lat;
    var lng;
    var latlngFromAddress = function(string) {
      var seperator = string.indexOf(',');
      lat = string.slice(0,seperator);
      lng = string.slice(seperator + 1);
      //console.log(lat + 'then' + lng)
      return 
    }
    latlngFromAddress(address);

    var latlng = new google.maps.LatLng(lat, lng)
    vm.mapSave = new google.maps.Map(document.getElementById('mapSave'), {
     zoom: 14,
     center : latlng,
     backgroundColor: 'pink',
     scrollwheel: false
   })
    vm.renderMarker({
      lat: lat, 
      lng: lng, 
      full: 'hi'
    })
  };

   vm.renderSavedMaps = function(selectionUser) {

   var item = selectionUser;
   console.log(selectionUser, 'this is selection user when clicked')
      //clears out older markers selected
      vm.markerResults = [];
   // if there are addresses destination that were entered
   // if (vm.maps.length > 0) {
     //create markers, map and everything in here???
     if (item === 0) {

      vm.renderMap(vm.maps[0][0]);

      console.log(vm.savedResults, 'may be a problem here')

      vm.savedResults.forEach(function(obj) {
        if (vm.maps[0].indexOf(obj.newAddress.latlng) !== -1) {
          vm.renderMarker(obj.newAddress);
          vm.markerResults.push(obj);

        }
      })

     } else {
      console.log('ERRORR ERROR SHOULD NOT BE IN HERE')

      vm.renderMap(vm.maps[item])

      vm.savedResults.forEach(function(obj) {
        console.log(obj, "is it true")

        if (!!obj.destinationAddress) {
            if (vm.maps.indexOf(obj.destinationAddress.latlng) !== -1) {
              console.log(obj, 'this obj had destination address right?')
              vm.renderMarker(obj.destinationAddress);
              vm.markerResults.push(obj);
            }
          }


          })

         }
         
   

  }
  //user clicks on item in unorderedlist and runs:
  vm.renderMarker = function(obj) {
    //console.log(obj, 'this is dat obj Dir meow ******')
    var lats = Number(obj.lat);
    var lngs = Number(obj.lng);
    var latlngs = new google.maps.LatLng(lats, lngs)
    //console.log(lat, typeof lat, 'lat lat lat lag')
    var markerSave = new google.maps.Marker({
       position: latlngs,
       map: vm.mapSave,
       title: obj.full
       })
    var msgSave = '<div id="content">' +
           '<h1> score : 88! </h1>' +
           '<p>' + obj.full + '</p>' +
           //'<h1> score : ' + obj.neighborhoodResult.total + '</h1>' +
           //'<div>' + obj.graph + '</div>' +
           '</div>';
    var infowindowSave = new google.maps.InfoWindow({
      content: msgSave
    })
    google.maps.event.addListener(markerSave, 'click', function() {
      infowindowSave.open(vm.mapSave, markerSave)
    })
  }


});
