var signin = angular.module('signin', ['app.factory']);

signin.controller('signinController', function(userFactory, $location){
  var vm = this;
  vm.user = {};
  vm.showErrorMsg = false;

  var init = function() {
    userFactory.signout();
  }

  vm.signin = function(){
    userFactory.signin(vm.user, function(success){
      if(success) {
        $location.path('/startup');
      } else {
        vm.error = true;
      }
    });
  }
  init();

});
