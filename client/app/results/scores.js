var scores = angular.module('scores', ['app.factory']);

scores.controller('scoresController', function(mainFactory){
  var vm = this;
  vm.chart = null;

  var init = function(){
    //var scores = mainFactory.getUserData().result.neighborhoodResult;
    // generate data for bar chart
    var scores = {safety: 40, walk: 80, a: 90};
    var chartData = [];
    for(var key in scores){
      chartData.push([key, scores[key]]);
    }
    // sort categories so they always appear in same order
    chartData.sort(function(a,b){
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    });
    console.log(chartData);
    vm.chart = c3.generate({
        bindto: '#scores-chart',
        size: {
          width: 300,
          height: 300
        },
        data: {
          columns : chartData,
          type: 'bar'
        },
        bar: {
          width: {
            ratio: 0.5
          }
        },
        axis: {
          y: {
            label: {
              text: 'Score',
              position: 'outer-middle'
            }
          }
        }
    });

    vm.chart.data.colors({

    })
  }
  init();


})
