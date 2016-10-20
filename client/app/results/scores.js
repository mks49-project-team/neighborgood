var scores = angular.module('scores', ['app.factory']);

scores.controller('scoresController', function(mainFactory){
  var vm = this;
  vm.chart = null;
  var showChart = function(){
    vm.chart = c3.generate({
        bindto: '#scores-chart',
        data: {
          columns: [['data1', 50, 100, 60]],
          type: 'bar'
        },
        bar: {
          width: {
            ratio: 0.8
          }
        }
    })
  }
  showChart();
  // vm.options = {
  //   data: [
  //     {
  //       safety: 80
  //     },
  //     {
  //       walkability: 60
  //     },
  //     {
  //       commute: 70
  //     }
  //   ],
  //   dimensions: {
  //     safety: {
  //       type: 'bar',
  //       dataType: 'numeric',
  //       show: true
  //     },
  //     walkability: {
  //       type: 'bar',
  //       dataType: 'numeric',
  //       show: true
  //     },
  //     commute: {
  //       type: 'bar',
  //       dataType: 'numeric',
  //       show: true
  //     }
  //   },
  //   chart: {
  //
  //   },
  //   state: {
  //
  //   }
  // }
  // vm.instance = null;
  // vm.instance = chart.flow({
  //   columns: [
  //     ['safety', 'commute'],
  //     ['data1', 50, 60]
  //   ]
  // });
  // vm.scores = 90;
  // var init = function(){
  //   vm.scores = mainFactory.getUserData().result.neighborhoodResult;
  // }
  // init();
})
