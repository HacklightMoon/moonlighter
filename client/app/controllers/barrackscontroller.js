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

  $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        readOnly: 'nocursor',
        mode: 'xml',
    };

 $scope.codemirrorLoaded = function(_editor){
    // Editor part
    var _doc = _editor.getDoc();
    _editor.focus();

    // Options
    _editor.setOption('firstLineNumber', 10);
    _doc.markClean()

    // // Events
    // _editor.on("beforeChange", function(){});
    // _editor.on("change", function(){});
  };

  $scope.getCodeWar()

}]);

