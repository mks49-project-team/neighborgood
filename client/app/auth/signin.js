var signin = angular.module('signin', ['app.factory']);

signin.controller('signinController', function(userFactory, $location){
  var vm = this;
  vm.user = {};
  vm.showErrorMsg = false;

  vm.signin = function(){
    userFactory.signin(vm.user)
      .then(function(success){
        if(success) {
          $location.path('savedSearches');
        } else {
          vm.showErrorMsg = true;
        }
      });
  }
});
