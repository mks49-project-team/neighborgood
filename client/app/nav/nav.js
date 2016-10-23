var nav = angular.module('nav', ['app.factory'])
nav.controller('navController', function($window, $location, userFactory){
  var vm = this;
  vm.isUserLoggedIn = $window.localStorage.user && $window.localStorage.token;


  vm.signout = function(){
    userFactory.signout();
    $location.path('signin');
  }
});
