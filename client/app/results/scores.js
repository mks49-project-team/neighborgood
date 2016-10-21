var scores = angular.module('scores', ['app.factory']);

scores.controller('scoresController', function(mainFactory){
  var vm = this;
  vm.chart = null;


  var init = function(){
    //var scores = mainFactory.getUserData().result.neighborhoodResult;
    // generate data for bar chart
    var scores = {safety: 40, walk: 80, total: 76};
    var chartData = [];
//    var chartTotalColumn;
    for(var key in scores){
        chartData.push([key, scores[key]]);
    }
    // sort categories so they always appear in same order
    chartData.sort(function(a,b){
      if((a[0] == 'total') != (b[0] == 'total')){ // keep total score as last bar
        return a[0] =='total' ? 1 : -1;
      }
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    });

    var chartBlankData = chartData.map(function(category){
      return [category[0], 0];
    });
//    chartBlankData.push(['total', 0]);

    vm.chart = c3.generate({
        bindto: '#scores-chart',
        size: {
          width: 250,
          height: 200
        },
        data: {
          columns : chartBlankData,//chartData,
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
      'safety': '#00000',
      'a': '#00000'
    });
    setTimeout(function(){
      vm.chart.load({
        columns: chartData
      })
    }, 250);
  }
  init();


})
