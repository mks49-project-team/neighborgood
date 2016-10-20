var scores = angular.module('scores', ['app.factory', 'angularChart']);

scores.controller('scoresController', function(mainFactory){
  var vm = this;
  vm.options = {
    data: [
      {
        sales: 130,
        income: 250
      }
    ],
    dimensions: {
      sales: {
        type: 'bar'
      },
      income: {
        axis: 'y2'
      }
    }
  }
  // vm.instance = null;
  // vm.scores = 90;
  // var init = function(){
  //   vm.scores = mainFactory.getUserData().result.neighborhoodResult;
  // }
  // init();
})
