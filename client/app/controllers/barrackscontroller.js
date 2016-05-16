angular.module('moonlighterApp.barracks',[])
.controller('BarracksCtrl',['$scope', 'Barracks', 'Profile',  '$http', '$cookies', function($scope, Barracks, Profile , $http, $cookies){
  
  $scope.userData = {};

  $scope.myValue = true;

  $scope.setup;

  /******** Functions in this controller ********/
  $scope.cwInsert= cwInsert;
  $scope.getCodeWar = getCodeWar;
  $scope.cwUserStats = cwUserStats;
  $scope.cwChallenge = cwChallenge;
  $scope.codemirrorLoaded = codemirrorLoaded;
  $scope.cwSolution = cwSolution;

  function cwInsert(){
    var userInput = {
      userID:     $cookies.get('user_id'),
      cwUsername: $scope.userData.cwUsername,
      cwUserAPI:  $scope.userData.cwUserAPI
    };

    if ($scope.userData.cwUsername !== undefined && $scope.userData.cwUserAPI !== undefined) {
      Barracks.addCwAPI(userInput)
      .then(function(data){
        console.log("here's some data:", data);
      })
      .then(function(){
        if ($scope.userData.cwUserAPI !== undefined) {
          $scope.myValue = false;
        }
      })
      .catch(function(err){
        console.error(err);
      })
    }

    // $scope.userData.cwUsername = null;
    // $scope.userData.cwUserAPI = null;
    // //$scope.$setPristine();


    Barracks.addCwAPI(userInput)
    .then(function(data){
      console.log("here's some data:", data);
    })
    .catch(function(err){
      console.error(err);
    })
    $scope.userData.cwUsername = null;
    $scope.userData.cwUserAPI = null;
    //$scope.$setPristine();

  }

   function cwFinalSolution(){
    Barracks.cwFinalSolution()
    .then(function(resp){
      console.log(resp)
    })
    .catch(function(err){
      console.error(err)
    });
   }
  
  function cwSolution(){
    var userCode = {
      'code': $scope.setup,
    };
    console.log(userCode);
    Barracks.cwTestSolution(userCode.code)
    .then(function(resp){
      console.log(resp);
    })
    .catch(function(err){
      console.error(err);
    });
  }

   function getCodeWar() {
    console.log("HEY I'm being called in BarracksCtrl!")
    Barracks.getCodeWar()
    .then(function(resp){
      console.log("this is some data in BarracksCtrl: 91", resp)
      $scope.codewars = resp;
    })
    .catch(function(err){
      console.error(err);
    });
  }

  function cwUserStats() {
    Barracks.cwUserStats()
    .then(function(resp){
      console.log("hey userstats: " , resp)
      // $scope.codewar = resp;
    })
    .catch(function(err){
      console.error(err);
    });
  }

  function cwChallenge() {
    $scope.spinner = true;
    Barracks.cwChallenge($scope.challengeType)
    .then(function(resp){
        $scope.spinner = false;
        $scope.description = resp.data.description;
        $scope.setup = resp.data.session.setup;
        $scope.name = resp.data.name;
        $scope.tags = resp.data.tags;
        $scope.example =resp.data.session.exampleFixture;
    })
    .catch(function(err){
      console.error(err);
    });
  }

  $scope.cwUserStats();
  // $scope.getCharacter();
  
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

