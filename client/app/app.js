var app = angular.module('app', ['ngRoute', 'app.factory', 'startup', 'options', 'results']);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'app/startup/startup.html',
      controller: 'startupController',
      controllerAs: 'vm'
    })
    .when('/options', {
      templateUrl: 'app/options/options.html',
      controller: 'optionsController',
      controllerAs: 'vm'
    })
    .when('/results', {
      templateUrl: 'app/results/results.html',
      controller: 'resultsController',
      controllerAs: 'vm'
    });
})
