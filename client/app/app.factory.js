var factoryModule = angular.module('app.factory', []);

factoryModule.factory('mainFactory', function($http){


  // var getCommute = function(secondaryAddress) {
  //   return $http({
  //     method: "GET",
  //     url:
  //   })
  // }

  return {
    getCommute: getCommute
  }
});
