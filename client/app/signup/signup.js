var signup = angular.module('signup', []);

signup.controller('signupController', function(){
  var vm = this;
  vm.signup = function(){
    console.log('signup');
  }
});
