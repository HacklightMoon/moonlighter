angular.module('moonlighterApp.barracks',[])
.controller('BarracksCtrl',['$scope', 'Barracks', '$http', function($scope, Barracks, $http){

  $scope.getCodeWar = function() {
    console.log("HEY I'm being called in BarracksCtrl!")
    Barracks.getCodeWar()
    .then(function(resp){
      console.log("this is some data in BarracksCtrl: ", resp)
      $scope.codewar = resp;
    })
    .catch(function(err){
      console.error(err);
    })
  }

    $scope.cwUserStats = function() {
    Barracks.cwUserStats()
    .then(function(resp){
      console.log(resp)
      $scope.codewar = resp;
    })
    .catch(function(err){
      console.error(err);
    })
  }

  $scope.cwNextChallenge = function() {
    Barracks.cwNextChallenge()
    .then(function(resp){
      console.log(resp)
      $scope.codewar = resp;
    })
    .catch(function(err){
      console.error(err);
    })
  }


  $scope.cwUserStats();
  $scope.cwNextChallenge();
  
  $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        matchBrackets: true,
        mode: 'javascript',
        theme: 'icecoder',
    };

 $scope.codemirrorLoaded = function(_editor){
    // Editor part
    var _doc = _editor.getDoc();
    _editor.focus();

    // Options
    _editor.setOption('firstLineNumber', 1);
    _doc.markClean()

    // // Events
    // _editor.on("beforeChange", function(){});
    // _editor.on("change", function(){});
  };

  $scope.getCodeWar()

}]);

