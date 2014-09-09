'use strict';

appControllers.controller('MainController',['$scope','$routeParams','GlobalService',function($scope,$routeParams,GlobalService){


  if($routeParams.tabUrl){
    GlobalService.tabUrl = $routeParams.tabUrl;
    GlobalService.canonicalUrl = $routeParams.canonicalUrl;
  }

  $scope.sel = $routeParams.sel;


  $scope.word = '';
  $scope.words = [];

  $scope.addWord = function(word){
    if(word === ''){
      return;
    }
    $scope.words.push(word);
    $scope.highlightWords();
    $scope.word = '';
  };

  $scope.removeWord = function(i){
    $scope.words.splice(i,1);
    $scope.highlightWords();
  };


  $scope.highlightWords = function(){
    if (chrome.runtime) {
      var message = {'wfAction':'highlightWords','params':$scope.words};
      chrome.runtime.sendMessage(message,function(response){
        console.log(response.confirmation);
      });
    }
  };

}]);