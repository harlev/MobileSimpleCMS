function getData(DataService, $rootScope){
  if ($rootScope.data)
    return {data:$rootScope.data};
  else {
    return DataService.getData()
      .success(function(data){
        //alert(data.pages.length);
        $rootScope.data = data;
      }).error(function(){
        alert("failed reading data");
      });
  }
}

angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('tableOfContents', {
      url: '/toc',
      templateUrl: 'templates/tableOfContents.html',
      controller: 'tableOfContentsCtrl',
      resolve: {
        pagesData: getData
      }
    })

    .state('page', {
      url: '/page/{title}',
      templateUrl: 'templates/page.html',
      controller: 'pageCtrl',
      resolve: {
        pagesData: getData
      }
    })

    .state('pageSearch', {
      url: '/page/{title}/{searchText}',
      templateUrl: 'templates/page.html',
      controller: 'pageCtrl',
      resolve: {
        pagesData: getData
      }
    })

    .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html',
      controller: 'searchCtrl',
      resolve: {
        pagesData: getData
      }
    })

        

        
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/toc');
});