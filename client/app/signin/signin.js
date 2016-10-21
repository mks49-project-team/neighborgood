var signin = angular.module('signin', ['app.factory.js']);

signin.controller('signinController', function(authentication, $location){
  var vm = this;
  vm.user = {};
  vm.showErrorMsg = false;

  var init = function() {
    authentication.signout();
  }

  vm.signin = function(){
    authentication.signin(vm.user, function(success){
      if(success) {
        $location.path('/');
      } else {
        vm.error = true;
      }
    });
  }
  init();

});
