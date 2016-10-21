var signin = angular.module('signin', ['app.factory']);

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
        $location.path('/startup');
      } else {
        vm.error = true;
      }
    });
  }
  init();

});
