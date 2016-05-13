angular.module('moonlighterApp.barracks',[])
.controller('BarracksCtrl',['$scope', 'Barracks', '$http', '$cookies', function($scope, Barracks, $http, $cookies){
  $scope.userData = {};
  


  /******** Functions in this controller ********/
  $scope.cwInsert= cwInsert;
  $scope.getCodeWar = getCodeWar;
  $scope.cwUserStats = cwUserStats;
  $scope.cwNextChallenge = cwNextChallenge;
  $scope.codemirrorLoaded = codemirrorLoaded;

  function cwInsert(){
    var userInput = {
      'userID':     $cookies.get('user_id'),
      'cwUsername': $scope.userData.cwUsername,
      'cwUserAPI':  $scope.userData.cwUserAPI
    };
    Barracks.addCwAPI(userInput)
    .then(function(data){
      console.log("here's some data:", data);
    })
    .catch(function(err){
      console.error(err);
    })
    $scope.userData.cwUsername = null;
    $scope.userData.cwUserAPI = null;
    // //$scope.$setPristine();
  }

   function getCodeWar() {
    console.log("HEY I'm being called in BarracksCtrl!")
    Barracks.getCodeWar()
    .then(function(resp){
      console.log("this is some data in BarracksCtrl: ", resp)
      $scope.codewars = resp;
    })
    .catch(function(err){
      console.error(err);
    })
  }

  function cwUserStats() {
    Barracks.cwUserStats()
    .then(function(resp){
      console.log("hey userstats: ", resp)
      // $scope.codewar = resp;
    })
    .catch(function(err){
      console.error(err);
    })
  }

  function cwNextChallenge() {
    Barracks.cwNextChallenge()
    .then(function(resp){
      console.log(resp)
      $scope.codeNext = resp;
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

  function codemirrorLoaded(_editor) {
    // Editor part
    var _doc = _editor.getDoc();
    _editor.focus();

    // Options
    _editor.setOption('firstLineNumber', 1);
    _doc.markClean();

    // // Events
    // _editor.on("beforeChange", function(){});
    // _editor.on("change", function(){});
  };
  $scope.getCodeWar();
}]);

