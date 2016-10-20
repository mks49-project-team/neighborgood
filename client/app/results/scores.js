var scores = angular.module('scores', ['app.factory']);

scores.controller('scoresController', function(mainFactory){
  var vm = this;
  vm.scores = 90;
  var init = function(){
    vm.scores = mainFactory.getUserData().result.neighborhoodResult;
  }
  init();
})
