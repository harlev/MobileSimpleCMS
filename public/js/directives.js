angular.module('app.directives', [])

.directive('frcParagraph', [function(){
  return {
    restrict: 'E',
    scope: {
      section: '=',
      highlight: '='
    },
    templateUrl: 'templates/paragraph.html'
  };
}])

.directive('frcCard', [function(){
  return {
    restrict: 'E',
    scope: {
      section: '=',
      highlight: '='
    },
    templateUrl: 'templates/card.html'
  };
}])

.directive('frcBullets', [function(){
  return {
    restrict: 'E',
    scope: {
      section: '=',
      highlight: '='
    },
    templateUrl: 'templates/bulletList.html'
  };
}])

.directive('frcNumbers', [function(){
  return {
    restrict: 'E',
    scope: {
      section: '=',
      highlight: '='
    },
    templateUrl: 'templates/orderedList.html'
  };
}])

.directive('frcList', [function(){
  return {
    restrict: 'E',
    scope: {
      section: '=',
      highlight: '='
    },
    templateUrl: 'templates/list.html'
  };
}])

.directive('frcImage', [function(){
  return {
    restrict: 'E',
    scope: {
      section: '='
    },
    templateUrl: 'templates/image.html'
  };
}])

.directive('frcChecklist', [function(){
  return {
    restrict: 'E',
    scope: {
      section: '='
    },
    controller: ['$scope','localStorageService', function($scope, localStorageService) {
      $scope.getRadios = function (section) {
        return _.filter(section.itemOptions, function (item) {
          return item.type == "radio";
        });
      };

      $scope.getTextInputs = function (section) {
        return _.filter(section.itemOptions, function (item) {
          return item.type == "text";
        });
      };

      $scope.initChecklist = function(){
        $scope.question = {text:[], choice:[]};
      };

      $scope.questionTextChange = function(questionKey){
        localStorageService.set("text" + questionKey, $scope.question.text[questionKey]);
      };

      $scope.radioChange = function(radioKey){
        localStorageService.set("radio" + radioKey, $scope.question.choice[radioKey]);
      }

      $scope.initQuestionText = function(questionKey){
        $scope.question.text[questionKey] = localStorageService.get("text" + questionKey);
      };

      $scope.initRadio = function(radioKey){
        $scope.question.choice[radioKey] = localStorageService.get("radio" + radioKey);
      };
    }],
    templateUrl: 'templates/checklist.html'
  };
}])

.directive('frcHtml', function() {
  return {
    restrict: 'E',
    scope: {
      section: '=',
      highlight: '='
    },
    templateUrl: 'templates/htmlSection.html'
  };
});

