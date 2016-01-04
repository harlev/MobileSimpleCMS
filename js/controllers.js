function searchInText(text, searchTerm, snippetPad, res, page) {
  if (text && _.isString(text)) {
    var index = text.toLowerCase().search(searchTerm.toLowerCase());
    if (index >= 0) {
      var snippet = ".." + text.substring(index - snippetPad, index + searchTerm.length + snippetPad) + "..";
      res.push({page: page.title, snippet: snippet, index: index});
    }
  }
}
function handleSection(section, searchTerm, snippetPad, res, page) {
  switch (section.type) {
    case "paragraph":
    case "html":
      searchInText(section.content, searchTerm, snippetPad, res, page);
      break;

    case "bullet list":
    case "ordered list":
      if (section.content) {
        _.forEach(section.content, function (item) {
          searchInText(item, searchTerm, snippetPad, res, page);
        });
      }
      break;
    case "list":
      if (section.content) {
        _.forEach(section.content, function (item) {
          searchInText(item.text, searchTerm, snippetPad, res, page);
        });
      }
      break;
    case "card":
      if (section.content) {
        _.forEach(section.content.sections, function(cardSection){
          handleSection(cardSection, searchTerm, snippetPad, res, page);
        });
      }
  }
}
angular.module('app.controllers', [])

  .controller('tableOfContentsCtrl', function($scope, pagesData) {
    $scope.init = function() {
    $scope.data = pagesData.data;

    $scope.tocPages = function() {
      return _.filter($scope.data.pages, function(page){
        return page.showInToc != false && !page.type;
      })
    }
  };

})
.controller('pageCtrl', function($scope, pagesData, $stateParams, $state) {
  $scope.page = _.find(pagesData.data.pages, function(pages){
    return pages.title == window.decodeURIComponent($stateParams.title);
  });

  if($stateParams.searchText){
    $scope.searchText = $stateParams.searchText;
  }

  $scope.goHome = function(){
    $state.go("tableOfContents");
  };
})

.controller('searchCtrl', function($scope, pagesData, $state) {
  $scope.data = pagesData.data.pages;
  $scope.searchResults = [];
  $scope.searchData = {
    searchText: ""
  };
  $scope.search = function(){
    var res = [];
    var searchTerm = $scope.searchData.searchText;
    var snippetPad = 20;
    _.forEach($scope.data,function(page){
      _.forEach(page.content.sections, function(section){
        handleSection(section, searchTerm, snippetPad, res, page);
      });
    });
    $scope.searchResults = res;
    return false;
  };

  $scope.goHome = function(){
    $state.go("tableOfContents");
  }
})
;
 