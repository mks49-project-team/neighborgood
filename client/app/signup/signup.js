var signup = angular.module('signup', ['app.factory']);

signup.controller('signupController', function(authentication){
  var vm = this;
  vm.signup = function(){
    console.log('signup');
  }
});
