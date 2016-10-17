var factoryModule = angular.module('app.factory', []);

factoryModule.factory('mainFactory', function($http){
  var a = 2;
  return {
    a: a
  }

});
