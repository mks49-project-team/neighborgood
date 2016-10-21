var app = angular.module('app', ['ui.router', 'app.factory', 'startup', 'options', 'results', 'scores', 'signin', 'signup']);

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
      url: '/startup',
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
    })
    .state('auth', {
      url: '/',
      templateUrl: 'app/auth.html',
      views: {
        '': {
          templateUrl: 'app/auth.html'
        },
        'signin@auth': {
          templateUrl: 'app/signin/signin.html',
          controller: 'signinController',
          controllerAs: 'vm'
        },
        'signup@auth': {
          templateUrl: 'app/signup/signup.html',
          controller: 'signupController',
          controllerAs: 'vm'
        }
     }
   });
    // .state('signin', {
    //   url: '/signin',
    //   templateUrl: 'app/signin/signin.html',
    //   controller: 'signinController',
    //   controllerAs: 'vm'
    // })
    // .state('signup', {
    //   url: '/signup',
    //   templateUrl: 'app/signup/signup.html',
    //   controller: 'signupController',
    //   controllerAs: 'vm'
    // });

});
