angular.module('app.services', [])

.factory('DataService', ['$http', '$q',
  function DataService($http) {
    // interface
    var service = {
      data: {},
      getData: getData
    };
    return service;

    // implementation
    function getData() {
      return $http.get("/data.json")
        .success(function(data) {
          service.data = data;
        })
    }
  }])

.filter('escape', function() {
    return window.encodeURIComponent;
})

.filter('highlight', function($sce) {
  return function(input, searchText) {
    if(searchText){
      return $sce.trustAsHtml(input.replace(new RegExp(searchText, 'gi'), '<span class="highlightedText">$&</span>'));
    } else {
      return input;
    }

  }
});

