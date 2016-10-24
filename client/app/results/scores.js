var scores = angular.module('scores', ['app.factory']);

scores.controller('scoresController', function(mainFactory){
  var vm = this;
  vm.chart = null;
  vm.scores = null;
  vm. neighborhood = null;
  vm.showDetailsText = false;
  vm.showCommute = mainFactory.user.result.priorities.commute !== 0;
  vm.commuteTime = vm.showCommute ? Math.round(mainFactory.user.result.commute.durationInTraffic.value / 60) : false;

  var setColors = function(chartData){
    return chartData.reduce(function(colors, category){
      if(category[1] < 40){
        colors[category[0]] = '#ff0000';
      } else if (category[1] >= 40 && category[1] < 75) {
        colors[category[0]] = '#ff6600';
      } else {
        colors[category[0]] = '#009900';
      }
      return colors;
    }, {});
  }

  vm.showDetails = function(){
    vm.showDetailsText = true;
  }

  vm.low = false;
  vm.mid = false;
  vm.high = false;

  var init = function(){
    vm.scores = mainFactory.getUserData().result.neighborhoodResult;
    vm.neighborhood = mainFactory.getUserData().result.newAddress.neighborhood;
    vm.scoreDisplay = vm.scores.total;
    // color code score box
    if (vm.scores.total < 40){
      vm.low = true;
    } else if (vm.scores.total >= 40 && vm.scores.total < 75){
      vm.mid = true;
    } else {
      vm.high = true;
    }

    // render scores in chart
    var chartData = [];

    for(var key in vm.scores){
      chartData.push([key, vm.scores[key]]);
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
        width: 200,
        height: 250
      },
      data: {
        columns : chartBlankData,
        type: 'bar',
        colors: chartColors,
      },
      axis: {
        x: {
          type: 'category',
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
          title: function(x) {return vm.neighborhood;}
        }
      }
    });

    setTimeout(function(){
      vm.chart.load({
        columns: chartData
      });

    }, 250);
  }
  init();
})
