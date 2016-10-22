var nav = angular.module('nav', ['app.factory'])
nav.controller('navController', function($window, $location, userFactory){
  var vm = this;
  vm.isUserLoggedIn = false;

  var init = function(){
    if($window.localStorage.user && $window.localStorage.token){
      vm.isUserLoggedIn = true;
    }
  }
  init();
  vm.signout = function(){
    userFactory.signout();
    $location.path('/signin');
  }
});
