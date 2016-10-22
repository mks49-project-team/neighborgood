var savedSearches = angular.module('savedSearches', ['app.factory']);

savedSearches.controller('savedSearchesController', function(userFactory){
  var vm = this;
  userFactory.getUserSearches()
    .then(function(results){
      vm.x = results;
    })
  //console.log(typeof vm.x);
});
