var app = angular.module('app', ['ui.router', 'app.factory', 'startup', 'options', 'results', 'scores', 'signin', 'signup', 'savedSearches', 'nav']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('startup', {
      url: '/',
      views: {
        '': {
          templateUrl: 'app/startup/startup.html',
          controller: 'startupController',
          controllerAs: 'vm'
        },
        'nav@startup': {
          templateUrl: 'app/nav/nav.html',
          controller: 'navController',
          controllerAs: 'vm'
        }
      }
    })
    .state('options', {
      url: '/options',
      views: {
        '': {
          templateUrl: 'app/options/options.html',
          controller: 'optionsController',
          controllerAs: 'vm'
        },
        'nav@options': {
          templateUrl: 'app/nav/nav.html',
          controller: 'navController',
          controllerAs: 'vm'
        }
      }
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
        },
        'nav@results': {
          templateUrl: 'app/nav/nav.html',
          controller: 'navController',
          controllerAs: 'vm'
        }
      }
    })
    .state('auth', {
      url: '/signin',
      views: {
        '': {
          templateUrl: 'app/auth/auth.html'
        },
        'signin@auth': {
          templateUrl: 'app/auth/signin.html',
          controller: 'signinController',
          controllerAs: 'vm'
        },
        'signup@auth': {
          templateUrl: 'app/auth/signup.html',
          controller: 'signupController',
          controllerAs: 'vm'
        },
        'nav@auth': {
          templateUrl: 'app/nav/nav.html',
          controller: 'navController',
          controllerAs: 'vm'
        }
     }
   })
   .state('savedSearches', {
     url: '/savedSearches',
     views: {
       '': {
         templateUrl: 'app/savedSearches/savedSearches.html',
         controller: 'savedSearchesController',
         controllerAs: 'vm'
       },
       'nav@savedSearches': {
         templateUrl: 'app/nav/nav.html',
         controller: 'navController',
         controllerAs: 'vm'
       }
     }
   });
});
