var signup = angular.module('signup', ['app.factory']);

signup.controller('signupController', function(userFactory){
  var vm = this;
  vm.signup = function(){
    console.log('signup');
  }
});
