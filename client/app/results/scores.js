var scores = angular.module('scores', ['app.factory']);

scores.controller('scoresController', function(mainFactory){
  var vm = this;
  vm.chart = null;

  var setColors = function(chartData){
    console.log('chartdata: ', chartData);
    //var colors = {};
    return chartData.reduce(function(colors, category){
      console.log(colors);
      if(category[1] < 40){
        colors[category[0]] = '#ff0000';
      } else if (category[1] >= 40 && category[1] < 75) {
        colors[category[0]] = 'ff6600';
      } else {
        colors[category[0]] = '009900';
      }
      return colors;
    }, {});
  }
  var init = function(){
    //var scores = mainFactory.getUserData().result.neighborhoodResult;
    //var neighborhood = mainFactory.getUserData().result.newAddress.neighborhood;
    // generate data for bar chart
    var neighborhood = 'la'
    var scores = {safety: 40, walk: 3, total: 76};
    var chartData = [];

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

    // generate bar colors based on scores-chart
    var chartColors = setColors(chartData);

    vm.chart = c3.generate({
        bindto: '#scores-chart',
        size: {
          width: 250,
          height: 200
        },
        data: {
          columns : chartBlankData,//chartData,
          type: 'bar',
          colors: chartColors,
        },
        axis: {
          x: {
            type: 'category',
            padding: {
              left: 0,
              right: 0
            },
            tick:{
              count: 0
            }
          },
          y: {
            tick: {
              count: 5
            },
            min: 0,
            max: 100,
            padding: 0,
            label: {
              text: 'Score',
              position: 'outer-middle'
            }
          }
        },
        tooltip: {
          grouped: false,
          format: {
            title: function(x) {return neighborhood;}
          }
        }
    });

    setTimeout(function(){
      vm.chart.load({
        columns: chartData
      })
    }, 250);
  }
  init();


})
