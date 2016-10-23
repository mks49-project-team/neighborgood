var signup = angular.module('signup', ['app.factory']);

signup.controller('signupController', function(userFactory, $location){
  var vm = this;
  vm.showErrorMsg = false;
  vm.user = {};

  vm.signup = function(){
    userFactory.signup(vm.user)
      .then(function(response){
        if(response.data === "exists"){
          vm.showErrorMsg = true;
        } else {
          $location.path('savedSearches');
        }
      });
  }
});
