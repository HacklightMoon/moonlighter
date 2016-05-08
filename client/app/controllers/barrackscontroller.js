angular.module('moonlighterApp.barracks',[])
.controller('BarracksCtrl',['$scope', 'Barracks', function($scope, Barracks){

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


  $scope.getCodeWar()

}]);

