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
        //console.log(results, 'this is sindie grab user serarch');
        //console.log(vm.savedResults) //array of objects! 
        vm.initMaps();
      })
    //console.log(typeof vm.x);
  };

  //grab user search data from DATABASE
  vm.grabUserSearches();

  //init map function
  vm.initMaps = function() {
    console.log('init map ')
    vm.arrangeDest();
    if (vm.maps[0].length > 0) {
      vm.renderSavedMaps(0);
    } else if (vm.maps.length > 1) {
      vm.renderSavedMaps(1);
    } else {
      console.log('please make new Search')
    } 
  };

  //fills vm.maps array with lat.lng string from each destination address, if none then makes it first address
  vm.arrangeDest = function() {
    vm.savedResults.forEach(function(result) {
      //console.log(result, "***** this is result object****")
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
    //console.log(vm.maps,'this is vm maps')
    //console.log(vm.mapsName, 'this is the mapsName object')
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
      //console.log(lat + 'then' + lng)
      return 
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
      lng: lng, 
    });

  };

   vm.renderSavedMaps = function(selectionUser) {
   var item = selectionUser;
   //console.log(selectionUser, 'this is selection user when clicked')
      //clears out older markers selected
    vm.markerResults = [];
   // if there are addresses destination that were entered
   // if (vm.maps.length > 0) {
     //create markers, map and everything in here???
    if (item === 0) {
      if (vm.maps[0].length > 0) {
        vm.renderMap(vm.maps[0][0]);
        //console.log(vm.savedResults, 'may be a problem here')

        vm.savedResults.forEach(function(obj) {
          if (vm.maps[0].indexOf(obj.newAddress.latlng) !== -1) {
            vm.renderMarker(obj.newAddress);
            vm.markerResults.push(obj);

          }
        });

      } else {
        console.log('please make new Search')
        }
     } else {
        //console.log('ERRORR ERROR SHOULD NOT BE IN HERE')
        vm.renderMap(vm.maps[item]);
        vm.savedResults.forEach(function(obj) {
          //console.log(obj, "is it true")
          if (!!obj.destinationAddress) {
              if (vm.maps.indexOf(obj.destinationAddress.latlng) !== -1) {
                //console.log(obj, 'this obj had destination address right?')
                vm.renderMarker(obj.destinationAddress);
                vm.renderMarker(obj.newAddress, obj)
                vm.markerResults.push(obj);
              }
            }


        })

      }
  };


  //user clicks on item in unorderedlist and runs:
  vm.renderMarker = function(obj, info) {
    //console.log(obj, 'this is dat obj Dir meow ******')
    var lats = Number(obj.lat);
    var lngs = Number(obj.lng);
    var msgSave;
    var latlngs = new google.maps.LatLng(lats, lngs)
    //console.log(lat, typeof lat, 'lat lat lat lag')
    var markerSave = new google.maps.Marker({
       position: latlngs,
       map: vm.mapSave,
       title: obj.full
       })
    var msgSaveMaker = function () { 
      if (info) {
           msgSave = '<div id="content">' +
           //'<h1> score : 88! </h1>' +
           '<h5> score </h5>' +
           '<h5>' + info.neighborhoodResult.total + '</h5>' +
           '<p>' + obj.street + '</p>' +
           //'<div>' + obj.graph + '</div>' +
           '</div>';
         } else {
          msgSave = '<div id="content">' +
           //'<h1> score : 88! </h1>' +
           '<p>' + obj.full + '</p>' +
           //'<h1> score : ' + obj.neighborhoodResult.total + '</h1>' +
           //'<div>' + obj.graph + '</div>' +
           '</div>';
         }
         //console.log(msgSave, "******** MSG SAVE ****");
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
