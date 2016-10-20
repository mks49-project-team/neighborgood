var app = angular.module('app', ['ui.router', 'app.factory', 'startup', 'options', 'results']);

// app.config(function($routeProvider){
//   $routeProvider
//     .when('/', {
//       templateUrl: 'app/startup/startup.html',
//       controller: 'startupController',
//       controllerAs: 'vm'
//     })
//     .when('/options', {
//       templateUrl: 'app/options/options.html',
//       controller: 'optionsController',
//       controllerAs: 'vm'
//     })
//     .when('/results', {
//       templateUrl: 'app/results/results.html',
//       controller: 'resultsController',
//       controllerAs: 'vm'
//     });
// })
app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('startup', {
      url: '/',
      templateUrl: 'app/startup/startup.html',
      controller: 'startupController',
      controllerAs: 'vm'
    })
    .state('options', {
      url: '/options',
      templateUrl: 'app/options/options.html',
      controller: 'optionsController',
      controllerAs: 'vm'
    })
    .state('results', {
      url: '/results',
      views: {
        '': {
          templateUrl: 'app/results/results.html',
          controller: 'resultsController',
          controllerAs: 'vm'
        },
        'scores@results': {
          templateUrl: 'app/results/scores.html',
          controller: 'scoresController',
          controllerAs: 'vm'
        }
      }
    });

});
